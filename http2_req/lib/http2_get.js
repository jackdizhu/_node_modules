(function () {

    const http = require('http'),
          https = require('https'),
          Q = require('q');
    var _http;
    var http2 = function (options){
        var defer=Q.defer();
        if(options._http2 == 'https'){
            _http = https;
        }else{
            _http = http;
        }
        _http.get(options.U, (res) => {
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
        return defer.promise;
    };

    module.exports = http2;

}());
