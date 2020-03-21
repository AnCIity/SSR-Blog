// 引用 express 框架
const express = require("express");

// 引入 path 模块
const path = require("path");

// 创建网站服务器
const app = express();

// 设置模板地址
app.set("views", path.join(__dirname, "views"));
// 设置模板默认后缀
app.set("view engine", "art");
// 选用的模板引擎
app.engine("art", require("express-art-template"));

// 开放静态资源
app.use(express.static(path.join(__dirname, "public")));

// 引入路由模块
const adminRoute = require("./route/admin");
const homeRoute = require("./route/home");

// 挂载路由
app.use("/admin", adminRoute);
app.use("/home", homeRoute);

// 监听端口
app.listen(3000);
