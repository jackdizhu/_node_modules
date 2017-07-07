
node_modules

log => express 中使用 调用 fs 模块 写log 日志

    log({
        err: err,
        debug: data
    });


getBrowserInfo => express 中使用 根据 req 参数获取浏览器信息

    var _BrowserInfo = getBrowserInfo(req);


gulp-devHtml => gulp+webpack 中使用 调用 underscore through2 fs 模块 根据 webpack chunkhash 文件名 替换对应html 中文件名称

    npm install gulp-devhtml

    devHtml = require('gulp-devHtml');

    .pipe(devHtml({
        files: ['./public/html/demo04.html']
    }))

aes => token生成 加密数据 调用 crypto 模块

    // 加密数据
    aesutil.enCode(data, key, iv);
    // 解密数据
    aesutil.deCode(data, key, iv);

 token => token生成 验证 crypto aes 模块

    // 创建 token ( 加密对象,有效时间秒数 )
    token.createToken(obj,timeout);
    // 解密 token
    token.decodeToken(token);
    // 验证 token
    token.checkToken(token);
