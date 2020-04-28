const express = require("express");
const setRouter = require("./set_router");

const router = express.Router();
const installerController = require("../controllers/installer_controller");

setRouter(router, installerController);

module.exports = router;
