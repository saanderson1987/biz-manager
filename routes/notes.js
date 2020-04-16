const express = require("express");
const setRouter = require("./set_router");

const router = express.Router();
const noteController = require("../controllers/note_controller");
setRouter(router, noteController);

module.exports = router;
