module.exports = (req, res) => {
    // 页面标识
    req.app.locals.currentLink = "article";

    res.render("admin/article");
};
