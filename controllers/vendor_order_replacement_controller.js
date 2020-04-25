const Controller = require("./controller.js");

const VendorOrderReplacement = require("../models/vendor_order_replacement.js");
const vendorOrderReplacementController = new Controller(VendorOrderReplacement);

module.exports = vendorOrderReplacementController;
