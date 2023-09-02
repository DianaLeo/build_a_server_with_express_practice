//如果是自己写cors，而不是引用第三方cors
const cors = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // wildcard
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
};

module.exports = cors;