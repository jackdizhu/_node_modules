(function () {

    const http = require('http'),
          https = require('https'),
          Q = require('q');
    var _http;
    var http2 = function (options){
        var defer=Q.defer(),req;
        if(options._http2 == 'https'){
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            _http = https;
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
                console.log({'res': err});
                defer.reject(err);
            });
            return defer.promise;
        });
        req.on('error',function(err){
            console.log({'req': err});
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
