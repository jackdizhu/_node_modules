(function () {

    const http2 = require('./http2_get.js'),
          fs = require('fs'),
          cheerio = require('cheerio'),
          getSrc = require('request'),
          Q = require('q');

    var httpsO = {
        U: 'http://www.66ip.cn/areaindex_1/1.html',
        _http2: 'http'
    };
    // 是否继续加载
    var isLoading = true;
    var host = 'http://www.66ip.cn';
    var page = 1;

    var get = function () {
        var defer=Q.defer();
        if(!isLoading){return;}

        http2(httpsO).then(function (data) {

          isLoading = false;

          var $ = cheerio.load(data);
          var a = $('.containerbox').find('table').find('tr');
          var aU = [];
          var O = {};

          for (var i = 0; i < a.length; i++) {
            if(Number(a[i].children[1].children[0].data) > 1){
              O = {
                ip: a[i].children[0].children[0].data,
                port: a[i].children[1].children[0].data
              };
              aU.push(O);
            }
          }
          defer.resolve(aU);
        });
        return defer.promise;
    }

    module.exports = get;

}());
