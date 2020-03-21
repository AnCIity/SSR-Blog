const express = require("express");

const route = express.Router();

route.get("/", (req, res) => {
    res.send("成功");
});

module.exports = route;
