// var $msg = require('./msg');
var is = require('is-js');

module.exports = {
  isSuccess: (res, data, msg) => {
    console.log(res, data, msg);

    msg = msg ? msg : '操作成功';
    res.json({
      code: '0',
      data: data,
      msg: msg
    });
  },
  isError: (res, err_code, msg) => {
    msg = msg ? msg : '操作失败';
    res.json({
      code: '1',
      msg: msg,
      err_code: err_code
    });
  },
  isNumber: function (value, res) {
    if (is.number(parseFloat(value))) {
      return true
    } else {
      let msg = value + ' is not Number;'
      this.isError(res, msg)
      return false
    }
  },
  isString: function (value, res) {
    if (is.string(value)) {
      return true
    } else {
      let msg = value + ' is not String;'
      this.isError(res, msg)
      return false
    }
  },
  isArray: function (value, res) {
    if (is.array(value)) {
      return true
    } else {
      let msg = value + ' is not Array;'
      this.isError(res, msg)
      return false
    }
  },
  isObject: function (value, res) {
    if (is.object(value)) {
      return true
    } else {
      let msg = value + ' is not Object;'
      this.isError(res, msg)
      return false
    }
  },
  //是否必填
  isRequired: function (params, res) {
    let isRequiredMsg = '';
    for (let i in params) {
      if (is.empty(params[i])) {
        isRequiredMsg += i + ' is required;';
      }
    }
    if (isRequiredMsg !== '') {
      this.isError(res, isRequiredMsg);
      return false
    } else {
      return true
    }
  }
}
