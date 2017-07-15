(function () {

    const http = require('http'),
          https = require('https'),
          Q = require('q');
    var _http;
    var http2 = function (options){
        var defer=Q.defer(),req;
        if(options._http2 == 'https'){
            //  处理 异常 EPROTO 101057795:error:14082174:SSL routines:ssl3_check_cert_and_algorithm:dh key too small:openssl\ssl\s3_clnt.c
            _http = https;
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            options.opt.agent = new https.Agent(options.opt);
        }else{
            _http = http;
        }
        req = _http.request(options.opt, (res) => {
            // 页面数据
            var html = '';
            var titles = [];
            res.setEncoding('utf-8');
            res
            .on('data', function (data) {
                html += data;
            })
            .on('end', function () {
                defer.resolve(html);
            })
            .on('error', function (err) {
                defer.reject(err);
            });
            return defer.promise;
        });
        req.on('error',function(err){
            defer.reject(err);
        })
        if(options.opt.method == 'POST' && options.postData){
            req.write(options.postData);
        }
        req.end();
        return defer.promise;
    };

    module.exports = http2;

}());
