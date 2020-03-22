// 引入 formidable 第三方模块
const formidable = require("formidable");
const path = require("path");

module.exports = (req, res) => {
    // 创建表单解析对象
    const form = new formidable.IncomingForm();
    // 配置上传文件存放位置
    form.uploadDir = path.join(__dirname, "../", "../", "public", "uploads");
    // 保留长传文件后缀
    form.keepExtensions = true;
    // 解析表单
    form.parse(req, (err, fields, files) => {
        // err：错误类型，错误信息
        // fields：对象类型，普通表单数据
        // files：对象类型，保存和上传文件相关数据
    });
};
