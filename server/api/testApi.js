var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var models = require('../db/db');
var $sql = require('../db/sqlMap');
var $utils = require('../utils/utils');
var $msg = require('../utils/msg');

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
  console.log(Cookies)
  //  $utils.jsonWrite(res, Cookies);

  var sql = $sql.test.add;
  var params = req.body;
  if (!$utils.isRequired(params, res)) return false
  if (!$utils.isString(params.name, res)) return false
  if (!$utils.isNumber(params.price, res)) return false
  conn.query(sql, [params.name, params.price], function (err, result) {
    if (err) {
      $utils.jsonWrite(res, err);
    }
    if (result) {
      $utils.jsonWrite(res, 'cookie', $msg.success);
    }
  })
});
// 增加用户接口
router.get('/addTest', (req, res) => {
  res.send('不支持get请求!');
});

module.exports = router;
