const Model = require("./model.js");
const pgp = require("pg-promise")();
const db = require("../db.js");
const { isEmpty } = require("../util/functions");
const Contact = require("./contact");
const Installation = require("./installation");

const defaultColumns = ["id", "created_at", "updated_at"];

class InstallerModel extends Model {
  constructor({ name, columns = [], belongsTo = [] }) {
    super(name);

    this.columns = new Set([...defaultColumns, ...columns]);

    this.joinColumns = belongsTo.reduce((acc, belongsToData) => {
      for (const col of belongsToData.model.columns) {
        acc[col] = { model: belongsToData.model };
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
            } else if (this.joinColumns[col]) {
              const joinColumnTableString = this.joinColumns[col].model
                .tableString;
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

  getById(id, queryParams = {}) {
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

  update(record) {
    if (this.isInvalidId(record.id)) return this.error("id");
    if (Object.keys(record).length === 1) return this.getById(record.id);

    const {
      thisTableRecord,
      otherRecordsByTable,
      thisTableRecordKeysLength,
    } = Object.entries(record).reduce(
      (acc, [col, value]) => {
        if (this.columns.has(col)) {
          acc.thisTableRecord[col] = value;
          acc.thisTableRecordKeysLength++;
        } else if (this.joinColumns[col]) {
          const colJoinTable = this.joinColumns[col].model.tableString;
          if (!acc.otherRecordsByTable[colJoinTable]) {
            acc.otherRecordsByTable[colJoinTable] = {};
          }
          acc.otherRecordsByTable[colJoinTable][col] = value;
        }
        return acc;
      },
      {
        thisTableRecord: {},
        otherRecordsByTable: {},
        thisTableRecordKeysLength: 0,
      }
    );

    const promises = [];
    // if thisTableRecord includes more than just id (which is necessary)
    if (thisTableRecordKeysLength > 1) {
      promises.push(super.update(thisTableRecord));
    }
    if (!isEmpty(otherRecordsByTable)) {
      return this.getById(record.id).then((currentRecord) => {
        for (const tableName in otherRecordsByTable) {
          promises.push(
            this.joinTablesByName[tableName].model.update({
              ...otherRecordsByTable[tableName],
              [this.joinTablesByName[tableName].foreignKeyReference]:
                currentRecord[this.joinTablesByName[tableName].foreignKey],
            })
          );
        }
        return Promise.all(promises).then((updatedRecords) => {
          const recordWithFieldsToReturn = updatedRecords.reduce(
            (acc, updatedRecord) => {
              for (const col in updatedRecord) {
                if (col !== "id" && record[col]) {
                  acc[col] = updatedRecord[col];
                }
              }
              return acc;
            },
            {}
          );
          return new Promise((resolve) => {
            resolve({ id: record.id, ...recordWithFieldsToReturn });
          });
        });
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
