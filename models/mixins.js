const Note = require("./note");

module.exports = {
  notesMixin: (Base) =>
    class extends Base {
      new(record) {
        const notes = record.notes;
        const author = record.author;
        delete record.notes;
        delete record.author;
        if (notes && author) {
          return super.new(record).then((newRecord) =>
            Note.new({
              parent_id: newRecord.id,
              parent_table: this.tableString,
              contents: notes,
              author,
            }).then(() => new Promise((resolve) => resolve(newRecord)))
          );
        } else {
          return super.new(record);
        }
      }
    },
};
