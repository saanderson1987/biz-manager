const Model = require("./model.js");
const pgp = require("pg-promise")();

class VendorOrderModel extends Model {
  getByQuery(queryParams) {
    queryParams.joinTable = new pgp.helpers.TableName("company");
    queryParams.joinClause =
      " INNER JOIN ${joinTable} on company.id = t1.vendor_id";
    return super.getByQuery(queryParams);
  }

  getById(id) {
    const joinTable = new pgp.helpers.TableName("company");
    const joinClause = " INNER JOIN ${joinTable} on company.id = t1.vendor_id";
    const columns =
      "job_order_id,vendor_id,price,number_of_pieces,date_ordered,po_num,t1.notes,company.name";
    return super.getById(id, { joinTable, joinClause, columns });
  }

  new(record) {
    return super.new(record).then((newRecord) => {
      return this.getById(newRecord.id);
    });
  }
}

const VendorOrder = new VendorOrderModel("vendor_order");
module.exports = VendorOrder;
