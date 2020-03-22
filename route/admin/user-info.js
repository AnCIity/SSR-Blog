const { User } = require("../../model/user");

module.exports = async (req, res) => {
    // 页面标识
    req.app.locals.currentLink = "user";

    const { message, id } = req.query;

    if (id) {
        // 修改操作
        let user = await User.findOne({ _id: id });

        // 渲染用户编辑页面
        res.render("admin/user-info", {
            message,
            user,
            link: "/admin/user-edit?id=" + id,
            button: "修改"
        });
    } else {
        // 添加操作
        res.render("admin/user-info", {
            message,
            link: "/admin/user-add",
            button: "添加"
        });
    }
};
