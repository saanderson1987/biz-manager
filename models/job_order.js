const Model = require("./model.js");
const { notesMixin } = require("./mixins");

const JobOrderModel = notesMixin(Model);
const JobOrder = new JobOrderModel("job_order");

module.exports = JobOrder;
