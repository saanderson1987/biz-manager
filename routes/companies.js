const express = require('express');
const setRouter = require('./set_router');

const router = express.Router();
const companyController = require('../controllers/company_controller');

setRouter(router, companyController);

module.exports = router;
