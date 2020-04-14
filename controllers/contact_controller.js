const Controller = require("./controller.js");

const Contact = require("../models/contact.js");
const contactController = new Controller(Contact);

module.exports = contactController;
