const Controller = require("./controller.js");

const Installer = require("../models/installer.js");
const installerController = new Controller(Installer);

module.exports = installerController;
