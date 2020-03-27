const express = require('express');
const setRouter = require('./set_router');

const router = express.Router();
const jobController = require('../controllers/job_controller');
setRouter(router, jobController);

module.exports = router;
