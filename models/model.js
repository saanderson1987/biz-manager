const db = require("../db.js");
const pgp = require("pg-promise")();

class Model {
  constructor(name) {
    this.tableString = name;
    this.table = new pgp.helpers.TableName(name);
  }

  createWhereClause(columns) {
    let whereClause = "";
    if (columns.length > 0) {
      whereClause = " WHERE ";
      columns.forEach((column, idx) => {
        if (idx > 0) whereClause += " AND ";
        if (column === "id") {
          whereClause += `t1.${column} = \${${column}}`;
        } else {
          whereClause += `${column} = \${${column}}`;
        }
      });
    }
    return whereClause;
  }

  createWhereClauseFromQueryParams(queryParams) {
    const columns = Object.keys(queryParams).reduce((acc, queryParamKey) => {
      if (
        queryParamKey !== "columns" &&
        queryParamKey !== "joinClause" &&
        queryParamKey.slice(0, 9) !== "joinTable"
      ) {
        acc.push(queryParamKey);
      }
      return acc;
    }, []);
    return this.createWhereClause(columns);
  }

  getByQuery(queryParams) {
    const selectClause = this.createSelectClause(queryParams.columns);
    const joinClause = queryParams.joinClause || "";
    const whereClause = this.createWhereClauseFromQueryParams(queryParams);

    queryParams.table = this.table;

    const query = pgp.as.format(
      selectClause + " FROM ${table} as t1" + joinClause + whereClause,
      queryParams
    );
    console.log(query);
    return this.format(db.any(query));
  }

  createSelectClause(columns) {
    const selectClause = "SELECT ";
    let selectColumns = "*";

    if (columns) {
      const columnsArr = columns.split(",");
      if (!columnsArr.includes("id")) {
        columnsArr.push("t1.id");
      }
      selectColumns = columnsArr.join(",");
    }

    return selectClause + selectColumns;
  }

  getById(id, { columns, joinClause = "", queryValues } = {}) {
    if (this.isInvalidId(id)) return this.error("id");
    console.log(queryValues);
    const query = pgp.as.format(
      this.createSelectClause(columns) +
        " FROM ${table} as t1" +
        joinClause +
        " WHERE t1.id = ${id}",
      {
        table: this.table,
        id,
        ...queryValues,
      }
    );
    console.log(query);
    return this.returnIfIdExists(db.one(query));
  }

  new(record) {
    const columns = Object.keys(record);
    const colSet = new pgp.helpers.ColumnSet(columns, {
      table: this.tableString,
    });
    const query = pgp.helpers.insert(record, colSet) + " RETURNING *";
    console.log(query);
    return db.one(query);
  }

  update(record) {
    if (this.isInvalidId(record.id)) return this.error("id");
    if (Object.keys(record).length === 1) return this.getById(record.id);
    record["?id"] = record.id;
    delete record.id;
    const columns = Object.keys(record);
    const colSet = new pgp.helpers.ColumnSet(columns, {
      table: this.tableString,
    });
    const query =
      pgp.helpers.update(record, colSet) +
      " WHERE id = " +
      record["?id"] +
      " RETURNING *";
    return this.returnIfIdExists(db.one(query));
  }

  delete(id) {
    const query = pgp.as.format(
      "DELETE FROM ${table} WHERE id = ${id} RETURNING id",
      {
        id: id,
        table: this.table,
      }
    );
    console.log(query);
    return this.returnIfIdExists(db.one(query));
  }

  isInvalidId(id) {
    // return id === null || id === undefined || typeof id !== 'number';
    const parsedId = Number(id);
    Number.isNaN(parsedId);
  }

  returnIfIdExists(query) {
    return query
      .then((data) => {
        return new Promise((resolve, reject) => {
          resolve(data);
        });
      })
      .catch((err) => {
        if (err.code === 0) return this.error("id");
      });
  }

  error(type) {
    // @param {string} type
    if (!type) type = "errorMessageType";
    const message = {
      errorMessageType: "Error: wrong error message type",
      id: "Error: Please enter a valid id",
    };
    return new Promise((resolve, reject) => {
      reject({ message: message[type] });
    });
  }

  format(query) {
    return query.then((records) => {
      const obj = {};
      records.forEach((record) => {
        obj[record.id] = record;
      });
      return new Promise((resolve, reject) => {
        resolve(obj);
      });
    });
  }
}

module.exports = Model;
