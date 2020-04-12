const Controller = require("./controller.js");

const Job = require("../models/job.js");
const jobController = new Controller(Job);

module.exports = jobController;
