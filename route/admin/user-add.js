// 引入用户集合
const { User, validateUser } = require("../../model/user");

// 引入加密模块
const encrypt = require("../../middleware/encrypt");

module.exports = async (req, res, next) => {
    // 验证数据
    try {
        await validateUser(req.body);
    } catch (e) {
        // 重定向 新增用户页面
        // return res.redirect(`/admin/user-edit?message=${e.message}`);
        return next(
            JSON.stringify({ path: "/admin/user-info", message: e.message })
        );
    }

    // 查询用户是否存在
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        // 用户已存在
        // return res.redirect(`/admin/user-edit?message=邮箱地址已被占用`);
        return next(
            JSON.stringify({
                path: "/admin/user-info",
                message: "邮箱地址已被占用"
            })
        );
    }

    // 创建用户

    req.body.password = encrypt.hash(req.body.password); // 加密密码

    // 将用户信息添加到数据库
    await User.create(req.body);

    res.redirect(`/admin/user`);
};
