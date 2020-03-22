// 引入 express 框架
const express = require("express");

// 创建博客展示页路由
const route = express.Router();

// 登录页面
route.get("/login", require("./admin/loginPage"));

// 登入功能
route.post("/login", require("./admin/login"));

// 登出功能
route.get("/logout", require("./admin/logout"));

// 用户页面
route.get("/user", require("./admin/userPage"));

// 用户信息页面
route.get("/user-info", require("./admin/user-info"));

// 添加用户
route.post("/user-add", require("./admin/user-add"));

// 修改用户
route.post("/user-edit", require("./admin/user-edit"));

// 删除用户
route.get("/user-del", require("./admin/user-del"));

// 文章列表页面
route.get("/article", require("./admin/article"));

// 文章编辑页面
route.get("/article-edit", require("./admin/article-edit"));

// 添加文章
route.post("/article-add", require("./admin/article-add"));

module.exports = route;
