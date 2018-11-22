var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var models = require('../db/db');
var $sql = require('../db/sqlMap');
var _ = require('../utils/utils');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

// 增加接口
router.post('/addtAnimate', (req, res) => {
  var sql = $sql.animate.add;
  var params = req.body;
  if (!_.isString(params.effect_name, res)) return false
  conn.query(sql, [params.effect_name], function (err, result) {
    if (err) {
      _.isError(res, err.sqlMessage);
    }
    if (result) {
      _.isSuccess(res, null, '操作成功');
    }
  })
});
// 查询接口
router.post('/selectAnimate', (req, res) => {
  var sql = $sql.animate.select;
  var params = req.body;
  conn.query(sql, function (err, result) {
    if (err) {
      _.isError(res, err.sqlMessage);
    }
    if (result) {
      _.isSuccess(res, result, '操作成功');
    }
  })
});

module.exports = router;
