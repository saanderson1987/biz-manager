const Controller = require("./controller.js");

const Note = require("../models/note.js");
const noteController = new Controller(Note);

module.exports = noteController;
