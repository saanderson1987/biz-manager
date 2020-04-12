const Controller = require("./controller.js");

const Company = require("../models/company.js");
const companyController = new Controller(Company);

module.exports = companyController;
