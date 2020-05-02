// 导入文章集合构造函数
const { Article } = require("../../model/article");
// 导入 mongoose-sex-page 分页处理模块
const pagination = require("mongoose-sex-page");

module.exports = async (req, res) => {
    // 页面标识
    req.app.locals.currentLink = "article";

    // 接收页码
    const page = req.query.page;

    // 查询所有文章数据
    let articles = await pagination(Article)
        .find()
        .page(page) // 当前页
        .size(5) // 每页显示数据条数
        .display(3) // 指定客户端显示的页码数量
        .populate("author") // 联合查询 author
        .exec(); // 向数据库发送查询请求

    // 渲染文章列表页面模板
    res.render("admin/article", {
        articles
    });
};
