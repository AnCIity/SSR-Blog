// 用户集合

// 引入 mongoose 模块
const mongoose = require("mongoose");

// 引入 joi 数据验证模块
const Joi = require("joi");

// 引入加密模块
// const encrypt = require("../middleware/encrypt");

// 创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 唯一
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // admin 超级管理员
    // normal 普通用户
    role: {
        type: String,
        required: true
    },
    // 0 启用，1 禁用
    state: {
        type: Number,
        default: 0
    }
});

// 创建集合
const User = mongoose.model("User", userSchema);

// 创建文档
// async function createUser() {
//     const pass = encrypt.hash("123456");
//     const user = await User.create({
//         username: "City",
//         email: "city@nanzc.com",
//         password: pass,
//         role: "admin",
//         state: 0
//     });
// }

// 验证用户信息
const validateUser = data => {
    // 定义验证规则
    const schema = {
        username: Joi.string()
            .min(2)
            .max(12)
            .required()
            .error(new Error("用户名不符合验证规则")),
        email: Joi.string()
            .email()
            .required()
            .error(new Error("邮箱格式不符合要求")),
        password: Joi.string()
            .regex(/^[a-zA-Z0-9]{3,30}$/)
            .required()
            .error(new Error("密码格式不符合要求")),
        role: Joi.string()
            .valid("normal", "admin")
            .required()
            .error(new Error("角色值非法")),
        state: Joi.number()
            .valid(0, 1)
            .required()
            .error(new Error("状态值非法"))
    };

    // 实施验证
    return Joi.validate(data, schema);
};

// 将用户集合作为模块成员导出
module.exports = {
    User,
    validateUser
};
