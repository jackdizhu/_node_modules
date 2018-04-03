// import Utils from './utils';
const Utils = require('./utils');

const _init = function (_this, params) {
  return Utils.extend_init(_this._model, params, _this._prototype)
}

class Model {
  constructor(_model) {
    this._model = Utils.extend({}, _model)
    this._prototype = Model
  }

  init(data) {
    return _init(this, data);
  }
}

module.exports =  Model;
