const express = require('express');
const setRouter = require('./set_router');

const router = express.Router();
const jobOrderController = require('../controllers/job_order_controller');
setRouter(router, jobOrderController);

module.exports = router;
