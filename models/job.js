const Model = require("./model.js");
const pgp = require("pg-promise")();

class JobModel extends Model {
  getById(id, { columns = "" } = {}) {
    return super.getById(id, {
      columns: columns
        .split(",")
        .map((column) => {
          if (column === "proposal_item_name") {
            return "proposal_item_type.name as proposal_item_name";
          }
          return `t1.${column}`;
        })
        .join(","),
      joinClause:
        " LEFT JOIN ${joinTable1} on proposal_item.job_id = t1.id LEFT JOIN ${joinTable2} on proposal_item_type.id = proposal_item.proposal_item_type_id",
      queryValues: {
        joinTable1: new pgp.helpers.TableName("proposal_item"),
        joinTable2: new pgp.helpers.TableName("proposal_item_type"),
      },
    });
  }
}

const Job = new JobModel("job");

module.exports = Job;
