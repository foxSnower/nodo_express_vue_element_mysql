var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var models = require('../db/db');
var $sql = require('../db/sqlMap');
var _ = require('../utils/utils');
// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

// 增加用户接口
router.post('/addTest', (req, res) => {
  // 获得客户端的Cookie
  var Cookies = {};
  req.headers.cookie && req.headers.cookie.split(';').forEach(function (Cookie) {
    var parts = Cookie.split('=');
    Cookies[parts[0].trim()] = (parts[1] || '').trim();
  });
  var sql = $sql.test.add;
  var params = req.body;
  // if (!_.isRequired(params, res)) return false
  // if (!_.isString(params.name, res)) return false
  // if (!_.isNumber(params.name, res)) return false
  conn.query(sql, [params.name, params.price], function (err, result) {
    if (err) {
      _.isError(res, err);
    }
    if (result) {

      _.isSuccess(res, null, '登陆成功');
    }
  })
});
// 增加用户接口
router.get('/addTest', (req, res) => {
  res.send('不支持get请求!');
});

module.exports = router;
