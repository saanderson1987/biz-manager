const Controller = require('./controller.js');

const Installation = require ('../models/installation.js');
const installationController = new Controller(Installation);

module.exports = installationController;
