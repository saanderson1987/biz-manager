const express = require('express');
const setRouter = require('./set_router');

const router = express.Router();
const installationController = require('../controllers/installation_controller');
setRouter(router, installationController);

module.exports = router;
