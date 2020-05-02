// 引用 express 框架
const express = require("express");

// 引入 path 路径处理模块
const path = require("path");

// 引入 morgan 日志管理模块
const morgan = require("morgan");

// 导入 express-session session管理模块
const session = require("express-session");

// 导入 art-template 模板引擎
const template = require("art-template");

// 导入 dateformat 时间处理模块
const dateFormat = require("dateformat");

// 导入 config 配置管理模块
const config = require("config");

// 创建网站服务器
const app = express();

// 数据库连接
require("./model/connect");

// 处理 get 请求参数
app.use(express.json());

// 处理 post请求参数
app.use(express.urlencoded({ extended: false }));

// 处理 session
app.use(session({ secret: "AnNan", resave: true, saveUninitialized: false }));

// 设置模板地址
app.set("views", path.join(__dirname, "views"));
// 设置模板默认后缀
app.set("view engine", "art");
// 选用的模板引擎
app.engine("art", require("express-art-template"));
// 向模板内部导入 dateFormat 变量
template.defaults.imports.dateFormat = dateFormat;

// 开放静态资源
app.use(express.static(path.join(__dirname, "public")));

config.get("title");

// 获取系统环境变量，返回值为对象
if (process.env.NODE_ENV == "development") {
    // 开发环境
    // 在开发环境中将服务端请求信息打印到终端
    app.use(morgan("dev"));
} else {
    // 生成环境
}

// 引入路由模块
const adminRoute = require("./route/admin");
const homeRoute = require("./route/home");

// 拦截请求 判断用户登录状态
app.use("/admin", require("./middleware/loginGuard"));

// 挂载路由
app.use("/admin", adminRoute);
app.use("/home", homeRoute);

// 错误处理
app.use((err, req, res, next) => {
    const result = JSON.parse(err);
    let params = [];
    for (let attr in result) {
        if (attr != "path") {
            params.push(attr + "=" + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join("&")}`);
});

// 监听端口
app.listen(3000, () => console.log("server run on http://localhost:3000/"));
