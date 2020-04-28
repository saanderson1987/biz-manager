const Model = require("./model.js");

const defaultColumns = ["id", "created_at", "updated_at"];

class ContactModel extends Model {
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
}

const Contact = new ContactModel({
  name: "contact",
  columns: ["name", "phone_num", "email", "position"],
});

module.exports = Contact;
