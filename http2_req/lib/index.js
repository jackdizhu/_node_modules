
var req = require('./http2.js');
var get = require('./http2_get.js');
var http2 = {
    req: req,
    get: get
};

module.exports = http2;
