// var $msg = require('./msg');
var is = require('is-js');
var mysql = require('mysql');
var models = require('../db/db');
// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

module.exports = {
  isSuccess: function (res, data, msg) {
    msg = msg ? msg : '操作成功';
    res.json({
      code: '0',
      data: data,
      msg: msg
    });
  },
  isError: function (res, err_code, msg) {
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
    if (is.string(String(value))) {
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
  },
  //获取数据
  sqlQuery: function (res, sql, params, fun) {
    let _vm = this;
    conn.query(sql, params, function (err, result) {
      if (err) _vm.isError(res, err.sqlMessage);
      if (result) fun(result);
    })
  },
  //获取表的数据数量
  sqlCount: function (res, table, fun) {
    let _vm = this;
    var cSql = "select count(0) as count from (" + table + ")";
    conn.query(cSql, function (err, result) {
      if (err) _vm.isError(res, err.sqlMessage);
      if (result) fun(result[0].count);
    })
  },
  //排序
  sortBy: (sortId) => {
    return function (o, p) {
      var a, b;
      if (typeof o === "object" && typeof p === "object" && o && p) {
        a = o[sortId];
        b = p[sortId];
        if (a === b) {
          return 0;
        }
        if (typeof a === typeof b) {
          return a < b ? -1 : 1;
        }
        return typeof a < typeof b ? -1 : 1;
      } else {
        throw ("error");
      }
    }
  }
}
