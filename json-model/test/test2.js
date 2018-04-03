const __Model = require('../src/index');
let _dataM = new __Model({
  a: 0,
  b: '',
  c: new Date(),
  d: false,
  e: [],
  e2: [
    {
      a: 0
    }
  ],
  f: {},
  g: (t) => {
    return t
  }
});
let _r = null
// console.log(_dataM)
_r = _dataM.init({
  a: '3',
  b: 3,
  c: '2018-03-02T09:36:31.035Z',
  d: 'false',
  e: '[]',
  e2:
    {
      a: '1'
    }
  ,
  f: '{}',
  g: '_g_'
});
console.log(_r);
