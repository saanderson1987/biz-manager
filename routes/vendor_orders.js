const express = require('express');
const setRouter = require('./set_router');

const router = express.Router();
const vendorOrderController = require('../controllers/vendor_order_controller');

setRouter(router, vendorOrderController);

module.exports = router;
