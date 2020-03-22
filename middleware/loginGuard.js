const guard = (req, res, next) => {
    // 判断用户登录状态，对除登录外的页面进行未登录拦截

    if (req.url != "/login" && !req.session.username) {
        // 未登录
        res.redirect("/admin/login");
    } else {
        // 已登录
        next();
    }
};

module.exports = guard;
