const Model = require("./model.js");
const { notesMixin } = require("./mixins");
const pgp = require("pg-promise")();
const db = require("../db.js");

class VendorOrderModel extends notesMixin(Model) {
  getByQuery(queryParams) {
    if (queryParams.columns.includes("does_have_replacements")) {
      const columns = queryParams.columns
        .split(",")
        .filter((col) => col !== "does_have_replacements")
        .join(",");

      const selectClause =
        this.createSelectClause(columns) +
        ",vendor_order_replacement.id as vendor_order_replacement_id";

      queryParams.joinTable1 = new pgp.helpers.TableName("company");
      queryParams.joinTable2 = new pgp.helpers.TableName(
        "vendor_order_replacement"
      );
      const joinClause =
        " INNER JOIN ${joinTable1} on company.id = t1.vendor_id LEFT JOIN ${joinTable2} on vendor_order_replacement.vendor_order_id = t1.id";

      const whereClause = this.createWhereClauseFromQueryParams(queryParams);

      queryParams.table = this.table;

      const query = pgp.as.format(
        selectClause + " FROM ${table} as t1" + joinClause + whereClause,
        queryParams
      );
      console.log(query);

      return db.any(query).then((records) => {
        console.log(records);
        const obj = {};
        records.forEach((record) => {
          if (record.vendor_order_replacement_id) {
            record.does_have_replacements = true;
          } else {
            record.does_have_replacements = false;
          }
          delete record.vendor_order_replacement_id;
          obj[record.id] = record;
        });
        return new Promise((resolve) => {
          resolve(obj);
        });
      });
    } else {
      queryParams.joinTable = new pgp.helpers.TableName("company");
      queryParams.joinClause =
        " INNER JOIN ${joinTable} on company.id = t1.vendor_id";
      return super.getByQuery(queryParams);
    }
  }

  getById(id, queryParams) {
    if (
      queryParams.columns &&
      queryParams.columns.includes("does_have_replacements")
    ) {
      return this.getByQuery({
        ...queryParams,
        columns: queryParams.columns + ",id",
        id,
      }).then(
        (recordsById) =>
          new Promise((resolve) => {
            resolve(Object.values(recordsById)[0]);
          })
      );
    } else {
      const joinTable = new pgp.helpers.TableName("company");
      const joinClause =
        " INNER JOIN ${joinTable} on company.id = t1.vendor_id";
      const columns =
        "job_order_id,vendor_id,completed,number_of_pieces,date_ordered,po_num,company.name";
      return super.getById(id, {
        queryValues: { joinTable },
        joinClause,
        columns,
      });
    }
  }

  new(record) {
    return super.new(record).then((newRecord) => {
      return this.getById(newRecord.id);
    });
  }
}

const VendorOrder = new VendorOrderModel("vendor_order");
module.exports = VendorOrder;
