const { User } = require("../../model/user");

module.exports = async (req, res) => {
    // 页面标识
    req.app.locals.currentLink = "user";

    // 当前页数
    let page = req.query.page || 1;
    // 每页显示数据
    let pagesize = 10;
    // 用户数据总数
    let count = await User.countDocuments({});
    // 总页数
    let total = Math.ceil(count / pagesize);

    // 页码对应数据查询开始位置
    let start = (page - 1) * pagesize;

    // 查询用户信息
    let users = await User.find({})
        .limit(pagesize)
        .skip(start);

    res.render("admin/user", {
        users,
        page,
        total
    });
};
