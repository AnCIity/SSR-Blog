const express = require("express");

const route = express.Router();

route.get("/", (req, res) => {
    res.render("admin/login");
});

route.get("/user", (req, res) => {
    res.render("admin/user");
});

module.exports = route;
