const Model = require("./model.js");
const pgp = require("pg-promise")();

class NoteModel extends Model {
  getByQuery(queryParams) {
    if (queryParams.columns && queryParams.columns.includes("author_name")) {
      queryParams.joinTable = new pgp.helpers.TableName("users");
      queryParams.joinClause =
        " INNER JOIN ${joinTable} on users.id = t1.author";
      queryParams.columns = queryParams.columns.replace(
        "author_name",
        "users.name as author_name"
      );
    }
    return super.getByQuery(queryParams);
  }

  getById(id, { columns }) {
    console.log(columns);
    if (columns && columns.includes("author_name")) {
      columns = columns
        .split(",")
        .map((column) => {
          if (column === "author_name") {
            return "users.username as author_name";
          } else {
            return "t1." + column;
          }
        })
        .join(",");
      const joinTable = new pgp.helpers.TableName("users");
      const joinClause = " INNER JOIN ${joinTable} on users.id = t1.author";
      return super.getById(id, {
        queryValues: { joinTable },
        joinClause,
        columns,
      });
    }
    return super.getById(id, { columns });
  }
}

const Note = new NoteModel("note");
module.exports = Note;
