const express = require("express");
const fs = require("fs");

const router = express.Router();

const filenames = fs.readdirSync(__dirname);
filenames.forEach((filename) => {
  if (filename === "router.js" || filename === "set_router.js") {
    return;
  } else {
    const subRouter = require(`./${filename}`);
    const route = filename.split(".")[0];
    router.use(`/${route}`, subRouter);
  }
});

module.exports = router;
