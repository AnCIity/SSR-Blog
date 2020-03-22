// 引入 mongoose 第三方模块
const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);
// 连接数据库
mongoose
    .connect("mongodb://localhost/SSRBlog", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("数据库连接成功"))
    .catch(() => console.log("数据库连接失败"));
