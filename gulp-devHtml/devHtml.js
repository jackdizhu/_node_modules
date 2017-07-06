
var _            = require('underscore');
var through      = require('through2');
var fs      = require('fs');
// var log      = require('../log.js');

function devHtml(opts) {
    // 默认参数
    var def = {
        files: []
    };
    opts = _.defaults((opts || {}), def);

    function _dev(Obj) {
        var str = Obj.data.toString();
        var R;
        for (var i = 0; i < Obj.nameArr.length; i++) {
            R = new RegExp(Obj.nameArr[i].Reg);
            str = str.replace(R,Obj.nameArr[i].name);
        }
        Obj.data = str;
        // 写入文件
        _write(Obj);
    }

    function _write(Obj) {
        fs.writeFile(Obj.file,Obj.data, (err) => {
          if (err){
             console.log(err);
          }
        });
    }

    function _read(Obj) {
        for (let i = 0; i < opts.files.length; i++) {
            if(opts.files[i]){
                fs.readFile(opts.files[i], (err, data) => {
                  if (err){
                     console.log(err);
                  }
                  // 替换资源名称
                  _dev({
                    data: data,
                    file: opts.files[i],
                    nameArr: Obj.nameArr
                  });
                });
            }
        }
    }

    return through.obj(function (file, enc, cb) {
        var _pathArr = file.history;
        var nameArr = [];
        var _name;
        var _Reg;
        var _obj = {};
        for (var i = 0; i < _pathArr.length; i++) {
            _obj = {};
            _name = _pathArr[i].match(/[a-zA-Z0-9]+.[a-zA-Z0-9]+.[a-z]+$/);
            if(_name.length){
                _obj.name = _name[0];
                _Reg = _name[0].match(/([a-zA-Z0-9]+).[a-zA-Z0-9]+.([a-z]+)$/);
                if(_Reg.length > 2){
                    _obj.Reg = _Reg[1] + '(.[a-zA-Z0-9]+)?.' + _Reg[2];
                }
                nameArr.push(_obj);
            }
        }
        // 读取html 文件
        _read({
            nameArr: nameArr
        });
    });

}

module.exports = devHtml;
