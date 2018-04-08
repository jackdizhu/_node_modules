
import VConsole from 'vconsole/dist/vconsole.min.js'

module.exports = function (config, test) {

  let _config = {
    host: config.host || 'http://127.0.0.1/errReport',
    params: config.params || {
      key: 'errReportKey'
    }
  }
  let _logs = []
  var _vConsole = null

  window.onerror = function(msg, url, line, col, error) {
    _logs.push(error.stack)

    // 信息上报
    let src = config.host + '?err=' +  error.stack
    for (var i in config.params) {
        if (config.params.hasOwnProperty(i)) {
            src += '&' + i + '=' + config.params[i]
        }
    }
    new Image().src = src
    // _vConsole.show && _vConsole.show()
    return true
  }

  // log 唤起方式 增加 ^ 滑动轨迹唤起
  var triggerLog = function (callback) {
    var first = {
      x: 0,
      y: document.documentElement.clientHeight
    }
    var second = {
      x: document.documentElement.clientWidth / 2,
      y: 0
    }
    var third = {
      x: document.documentElement.clientWidth,
      y: document.documentElement.clientHeight
    }
    var flag1, flag2
    var distance = 50

    document.addEventListener('touchmove', function (e) {
      if (flag1 && Math.abs(e.targetTouches[0].clientX - second.x) < distance && Math.abs(e.targetTouches[0].clientY - second.y) < distance) {
        flag2 = true
      }
      if (flag2 && Math.abs(e.targetTouches[0].clientX - third.x) < distance && Math.abs(e.targetTouches[0].clientY - third.y) < distance) {
        callback()
        flag1 = flag2 = false
      }
    })
    document.addEventListener('touchend', function () {
      flag1 = flag2 = false
    })
    document.addEventListener('touchstart', function (e) {
      flag1 = flag2 = false
      if (Math.abs(e.targetTouches[0].clientX - first.x) < distance && Math.abs(e.targetTouches[0].clientY - first.y) < distance) {
        flag1 = true
        e.preventDefault()
      }
    })
  }
  triggerLog(function () {
    if (_vConsole) {
      _vConsole && _vConsole.show()
    } else {
      _vConsole = new VConsole()

      for (let i = 0; i < _logs.length; i++) {
        console.error(_logs[i])
      }
    }
  })
  // 测试
  if (test) {
    console.log('Hello world')
    console.log('this is log content')
    console.debug('this is debug content')
    console.error('this is error content')

    var a = 1, b = 2;
    var c = d * a
  }
}

