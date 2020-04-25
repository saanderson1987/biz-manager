const express = require("express");
const setRouter = require("./set_router");

const router = express.Router();
const vendorOrderReplacementController = require("../controllers/vendor_order_replacement_controller");

setRouter(router, vendorOrderReplacementController);

module.exports = router;
