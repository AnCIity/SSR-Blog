// 引入加密模块
const crypto = require("crypto");

function hash(data) {
    let hamc = crypto.createHmac("md5", "SSRBlog");
    hamc.update(data);
    return hamc.digest("hex");
}

function compare(data, hax) {
    return hash(data) === hax;
}

module.exports = {
    hash,
    compare
};
