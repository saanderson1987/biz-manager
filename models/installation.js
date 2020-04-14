const Model = require("./model.js");
const InstallationJobOrder = require("./installation_job_order");
const pgp = require("pg-promise")();
const db = require("../db.js");

class InstallationModel extends Model {
  getByQuery(queryParams) {
    queryParams.joinTable = new pgp.helpers.TableName("installation_job_order");
    queryParams.joinClause =
      " INNER JOIN ${joinTable} on installation_job_order.installation_id = t1.id";
    return super.getByQuery(queryParams);
  }

  new(record) {
    const newInstallationRecord = { ...record };
    delete newInstallationRecord.job_order_id;
    return super.new(newInstallationRecord).then((newRecord) => {
      const newInstallationJobOrderRecord = {
        job_order_id: record.job_order_id,
        installation_id: newRecord.id,
      };
      return InstallationJobOrder.new(newInstallationJobOrderRecord).then(
        () => {
          return new Promise((resolve, reject) => {
            resolve(newRecord);
          });
        }
      );
    });
  }

  update(record) {
    if (record.job_order_id) {
      const joinTable = new pgp.helpers.TableName("installation_job_order");
      const colSet = new pgp.helpers.ColumnSet(["job_order_id"], {
        table: joinTable,
      });
      const query =
        pgp.helpers.update({ job_order_id: record.job_order_id }, colSet) +
        " WHERE installation_id = " +
        record.id +
        " RETURNING *";
      console.log(query);
      return this.returnIfIdExists(db.one(query)).then(() => {
        delete record.job_order_id;
        return super.update(record);
      });
    }
    return super.update(record);
  }

  getById(id) {
    const joinTable = new pgp.helpers.TableName("installation_job_order");
    const joinClause =
      " INNER JOIN ${joinTable} on installation_job_order.installation_id = t1.id";
    return super.getById(id, { queryValues: { joinTable }, joinClause });
  }
}

const Installation = new InstallationModel("installation");
module.exports = Installation;
