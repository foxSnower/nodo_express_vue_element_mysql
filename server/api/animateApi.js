var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var models = require('../db/db');
var $sql = require('../db/sqlMap');
var $utils = require('../utils/utils');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

// 增加接口
router.post('/selectAnimate', (req, res) => {
  // 获得客户端的Cookie
  var Cookies = {};
  req.headers.cookie && req.headers.cookie.split(';').forEach(function (Cookie) {
    var parts = Cookie.split('=');
    Cookies[parts[0].trim()] = (parts[1] || '').trim();
  });
  console.log(Cookies)
  var sql = $sql.animate.select;
  conn.query(sql, function (err, result) {
    if (err) {
      $utils.jsonWrite(res, err);
    }
    if (result) {
      $utils.jsonWrite(res, 'cookie', $msg.loginSuccess);
    }
  })
});
// 查询接口
router.post('/selectAnimate', (req, res) => {
  // 获得客户端的Cookie
  var Cookies = {};
  req.headers.cookie && req.headers.cookie.split(';').forEach(function (Cookie) {
    var parts = Cookie.split('=');
    Cookies[parts[0].trim()] = (parts[1] || '').trim();
  });
  console.log(Cookies)
  var sql = $sql.animate.select;
  conn.query(sql, function (err, result) {
    if (err) {
      $utils.jsonWrite(res, err);
    }
    if (result) {
      $utils.jsonWrite(res, 'cookie', $msg.loginSuccess);
    }
  })
});
// 增加用户接口
router.get('/addTest', (req, res) => {
  res.send('不支持get请求!');
});

module.exports = router;
