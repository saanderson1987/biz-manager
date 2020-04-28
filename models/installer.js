const Model = require("./model.js");
const pgp = require("pg-promise")();
const db = require("../db.js");
const Contact = require("./contact");
const Installation = require("./installation");

const defaultColumns = ["id", "created_at", "updated_at"];

class InstallerModel extends Model {
  constructor({ name, columns = [], belongsTo = [] }) {
    super(name);

    this.columns = new Set([...defaultColumns, ...columns]);

    this.joinColumns = belongsTo.reduce((acc, belongsToData) => {
      for (const col of belongsToData.model.columns) {
        acc[col] = { tableString: belongsToData.model.tableString };
      }
      return acc;
    }, {});

    this.joinTablesByName = belongsTo.reduce((acc, belongsToData) => {
      acc[belongsToData.model.tableString] = belongsToData;
      return acc;
    }, {});
  }

  getByQuery(queryParams) {
    queryParams.joinTable = new pgp.helpers.TableName("contact");
    queryParams.joinClause =
      " INNER JOIN ${joinTable} on contact.id = t1.contact_id";
    return super.getByQuery(queryParams);
  }

  getSelectClauseAndJoinClause(columns) {
    const { queryJoinTablesByName, selectColumns } = (columns || "")
      .split(",")
      .reduce(
        (acc, col, idx, columnsArr) => {
          if (col) {
            if (col === "id") {
              acc.includesId = true;
            }
            let tableString;
            if (this.columns.has(col)) {
              tableString = this.tableString;
            }
            if (this.joinColumns[col]) {
              const joinColumnTableString = this.joinColumns[col].tableString;
              if (!acc.queryJoinTablesByName[joinColumnTableString]) {
                acc.queryJoinTablesByName[
                  joinColumnTableString
                ] = new pgp.helpers.TableName(joinColumnTableString);
              }
              tableString = joinColumnTableString;
            }

            acc.selectColumns = idx > 0 ? "," : "" + tableString + "." + col;

            if (idx === columnsArr.length - 1 && !acc.includesId) {
              acc.selectColumns += "," + this.tableString + "." + "id";
            }
          }
          return acc;
        },
        { queryJoinTablesByName: {}, selectColumns: "", includesId: false }
      );

    const joinClause = Object.keys(queryJoinTablesByName).reduce(
      (acc, joinTableName) => {
        acc +=
          ` INNER JOIN \${${joinTableName}} on ` +
          joinTableName +
          "." +
          this.joinTablesByName[joinTableName].foreignKeyReference +
          " = " +
          this.table +
          "." +
          this.joinTablesByName[joinTableName].foreignKey;
        return acc;
      },
      ""
    );

    return {
      selectClause: "SELECT " + (selectColumns || "*"),
      joinClause,
      joinTables: queryJoinTablesByName,
    };
  }

  getById(id, queryParams) {
    if (this.isInvalidId(id)) return this.error("id");

    const {
      selectClause,
      joinClause,
      joinTables,
    } = this.getSelectClauseAndJoinClause(queryParams.columns);

    const query = pgp.as.format(
      selectClause +
        " FROM ${table}" +
        joinClause +
        ` WHERE ${this.tableString}.id = \${id}`,
      {
        table: this.table,
        id,
        ...joinTables,
      }
    );

    console.log(query);
    return this.returnIfIdExists(db.one(query));
  }

  new(record) {
    if (record.name) {
      return this.joinTablesByName.contact.model
        .new({ name: record.name })
        .then((newContact) => {
          delete record.name;
          return super
            .new({ ...record, contact_id: newContact.id })
            .then((newRecord) => {
              return new Promise((resolve, reject) => {
                resolve({ ...newRecord, name: newContact.name });
              });
            });
        });
    } else {
      return super.new(record).then((newRecord) => {
        return this.getById(newRecord.id);
      });
    }
  }
}

const Installer = new InstallerModel({
  name: "installer",
  columns: ["contact_id", "installation_id"],
  belongsTo: [
    { model: Contact, foreignKey: "contact_id", foreignKeyReference: "id" },
    {
      model: Installation,
      foreignKey: "installation_id",
      foreignKeyReference: "id",
    },
  ],
});

module.exports = Installer;
