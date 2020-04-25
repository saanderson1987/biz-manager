const Model = require("./model.js");
const { notesMixin } = require("./mixins");

const CompanyModel = notesMixin(Model);
const Company = new CompanyModel("company");

module.exports = Company;
