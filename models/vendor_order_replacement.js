const Model = require("./model.js");
const { notesMixin } = require("./mixins");

const VendorOrderModel = notesMixin(Model);
const VendorOrder = new VendorOrderModel("vendor_order_replacement");

module.exports = VendorOrder;
