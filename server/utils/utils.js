var $msg = require('./msg');

module.exports = {
  //返回json
  jsonWrite: function (res, data, msg, isFail) {
    console.log(isFail)
    if (isFail) {
      res.json({
        code: '1',
        msg: msg
      });
    } else {
      res.json({
        code: '0',
        msg: msg,
        data: data
      });
    }
  },
  isNumber: function (value,res) {
    let isRight = Object.prototype.toString.call(parseFloat(value))==='[object Number]'
    if(isRight){
      return true
    }else{
      let msg = value + ' is not Number;'
      this.jsonWrite(res, null, msg, true)
      return false
    }
  },
  isString: function (value,res) {
    let isRight = Object.prototype.toString.call(value)==='[object String]';
    if(isRight){
      return true
    }else{
      let msg = value + ' is not String;'
      this.jsonWrite(res, null, msg, true)
      return false
    }
  },
  isArray:function (value,res) {
    let isRight = Object.prototype.toString.call(value)==='[object Array]';
    if(isRight){
      return true
    }else{
      let msg = value + ' is not Array;'
      this.jsonWrite(res, null, msg, true)
      return false
    }
  },
  isObject:function (value,res) {
    let isRight = Object.prototype.toString.call(value)==='[object Object]';
    if(isRight){
      return true
    }else{
      let msg = value + ' is not Object;'
      this.jsonWrite(res, null, msg, true)
      return false
    }
  },
  //是否必填
  isRequired: function (params, res) {
    let isRequiredMsg = '';
    for (let i in params) {
      if (params[i] === '' || params[i] === null || params[i] === 'undefined') {
        isRequiredMsg += i + $msg.required;
      }
    }
    if (isRequiredMsg !== '') {
      this.jsonWrite(res, null, isRequiredMsg, true)
      return false
    } else {
      return true
    }
  }
}
