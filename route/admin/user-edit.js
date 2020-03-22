const { User } = require("../../model/user");

const encrypt = require("../../middleware/encrypt");

module.exports = async (req, res, next) => {
    // 要修改的用户数据
    const { username, email, role, state, password } = req.body;
    // 修改用户id
    const id = req.query.id;

    // 查询用户数据
    let user = await User.findOne({ _id: id });

    // 密码比对
    if (encrypt.compare(password, user.password)) {
        // 将用户信息更新到数据库
        await User.updateOne(
            { _id: id },
            {
                username,
                email,
                role,
                state
            }
        );

        // 重定向 用户列表
        res.redirect("/admin/user");
    } else {
        // 失败
        next(
            JSON.stringify({
                path: "/admin/user-info",
                message: "原始密码错误，无法修改",
                id
            })
        );
    }
};
