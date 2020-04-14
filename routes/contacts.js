const express = require("express");
const setRouter = require("./set_router");

const router = express.Router();
const contactController = require("../controllers/contact_controller");
setRouter(router, contactController);

module.exports = router;
