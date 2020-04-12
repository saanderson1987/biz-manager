const Controller = require("./controller.js");

const VendorOrder = require("../models/vendor_order.js");
const vendorOrderController = new Controller(VendorOrder);

module.exports = vendorOrderController;
