
export default {
  isObjFunc: function(name) {
    var toString = Object.prototype.toString
    return function() {
        return toString.call(arguments[0]) === '[object ' + name + ']'
    }
  },
  getTypeof(input) {
    let _str = Object.prototype.toString.call(input)
    let _r = null
    switch (_str) {
      case '[object String]':
      _r = 'String'
        break;
      case '[object Number]':
      _r = 'Number'
        break;
      case '[object Boolean]':
      _r = 'Boolean'
        break;
      case '[object Date]':
      _r = 'Date'
        break;
      case '[object Undefined]':
      _r = 'Undefined'
        break;
      case '[object Null]':
      _r = 'Null'
        break;
      case '[object Object]':
      _r = 'Object'
        break;
      case '[object Array]':
      _r = 'Array'
        break;
      case '[object Function]':
      _r = 'Function'
        break;
      default:
        break;
    }
    return _r
  },
  isTypeof(v1, v2) {
    return Object.prototype.toString.call(v1) === Object.prototype.toString.call(v2)
  },
  isObject(input) {
    return this.getTypeof(input) === 'Object';
  },
  isArray(input) {
    return this.getTypeof(input) === 'Array';
  },
  isDate(input) {
    return this.getTypeof(input) === 'Date';
  },
  isNumber(input) {
    return this.getTypeof(input) === 'Number';
  },
  isString(input) {
    return this.getTypeof(input) === 'String';
  },
  isBoolean(input) {
    return this.getTypeof(input) === 'Boolean';
  },
  isFunction(input) {
    return this.getTypeof(input) === 'Function';
  },
  TypeConversion(to, from) {
    let _r = null
    let _str = this.getTypeof(to)
    switch (_str) {
      case 'String':
        _r = from + ''
        break;
      case 'Number':
        _r = Number(from) || 0
        break;
      case 'Boolean':
        // 处理 'false' 'true' 等情况
        if (from === 'false' || from === 'FALSE') {
          _r = false
        } else if (from === 'true' || from === 'TRUE') {
          _r = true
        } else {
          _r = Boolean(from)
        }
        break;
      case 'Date':
        _r = new Date(from)
          break;
      case 'Undefined':
        // Utils.extend_init({}, _model, params) 三个参数是 有 undefined 情况
        _r = from
        break;
      case 'Null':
        _r = from
        break;
      case 'Object':
        _r = new Object(from)
        break;
      case 'Array':
        _r = new Array(from)
        break;
      case 'Function':
        // Function 问题单独处理
        // _r = new Function(from);
        _r = to(from)
        break;
      default:
        _r = from
        break;
    }
    return _r
  },
  deepCopy(data) {
    let copyOne = null;
    if (this.isObject(data)) {
      copyOne = {};
      for (const key in data) {
        copyOne[key] = this.deepCopy(data[key]);
      }
    } else if (this.isArray(data)) {
      copyOne = [];
      for (const index of data) {
        copyOne.push(this.deepCopy(index));
      }
    } else {
      copyOne = data;
    }
    return copyOne;
  },
  deepFreeze(obj) {
    const that = this;
    Object.freeze(obj);
    Object.keys(obj).forEach((key, value) => {
      if (that.isObject(obj[key])) {
        this.deepFreeze(obj[key]);
      }
    });
    return obj;
  },
  mergeArray(arr1, arr2) {
    for (var i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr1[i] === arr2[j]) {
          arr1.splice(i, 1);
        }
      }
    }
    for (var i = 0; i < arr2.length; i++) {
      arr1.push(arr2[i]);
    }
    return arr1;
  },
  extend_init: function(target, src) {
    var obj, copy, _target, _src, __src
    // console.log(target, src)
    if (this.isObject(target)) {
        // 遍历 初始数据
      for(var prop in target) {
        // 初始数据
        _target = target[prop]
        // 实例数据
        _src = src[prop]

        target[prop] = this.extend_init(_target, _src)
      }
    } else if (this.isArray(target)) {
      if (this.isArray(src)) {
        for (let i = 0; i < src.length; i++) {
          // 深拷贝 生成新的对象 数组
          if (this.isArray(target[0])) {
            _target = this.extend([], target[0])
          } else if (this.isObject(target[0])) {
            _target = this.extend({}, target[0])
          }
          _src = src[i]
          // 防止修改原始数据 _target
          target[i] = this.extend_init(_target, _src)
        }
      } else {
        // 对象转 数组
        __src = this.TypeConversion(target, src)

        // 深拷贝 生成新的对象 数组
        if (this.isArray(target[0])) {
          _target = this.extend([], target[0])
        } else if (this.isObject(target[0])) {
          _target = this.extend({}, target[0])
        }
        _src = __src[0]
        // 防止修改原始数据 _target
        target[0] = this.extend_init(_target, _src)
      }
    } else {
      // 类型转换
      target = this.TypeConversion(target, src)
    }
    return target
  },
  extend: function () {
    var options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      // 深拷贝
      deep = true;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[1] || {};
      i = 2;
    }
    if (typeof target !== "object" && !this.isFunction(target)) {
      target = {};
    }
    if (length === i) {
      target = this;
      --i;
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (deep && copy && (this.isObject(copy) || (copyIsArray = this.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && this.isArray(src) ? src : [];
            } else {
              clone = src && this.isObject(src) ? src : {};
            }
            target[name] = this.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  }
};
