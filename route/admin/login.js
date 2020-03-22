// 引入 encrypt 加密模块
const encrypt = require("../../middleware/encrypt");

// 导入用户集合构造函数
const { User } = require("../../model/user");

module.exports = async (req, res) => {
    // 接收请求参数
    const { email, password } = req.body;

    // 如果用户没有输入邮件地址或密码
    if (email.trim().length == 0 || password.trim().length == 0)
        return res
            .status(400)
            .render("admin/error", { msg: "邮件地址或者密码错误" });

    // 根据邮箱地址查询用户信息
    let user = await User.findOne({ email });
    if (user) {
        // 查询到用户
        // 比对密码

        if (encrypt.compare(password, user.password)) {
            // 登录成功
            req.session.username = user.username;

            // 重定向到用户列表
            req.app.locals.userInfo = user;
            res.redirect("/admin/user");
        } else {
            // 登录失败
            res.status(400).render("admin/error", {
                msg: "邮箱地址或者密码错误"
            });
        }
    } else {
        // 未查询到用户
        res.status(400).render("admin/error", { msg: "邮箱地址或者密码错误" });
    }
};
