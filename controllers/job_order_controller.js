const Controller = require("./controller.js");

const JobOrder = require("../models/job_order.js");
const jobOrderController = new Controller(JobOrder);

module.exports = jobOrderController;
