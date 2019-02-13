var is = require('is-js');
var express = require('express');
var router = express.Router();
var $sql = require('../db/sqlMap');
var Fuc = require('../utils');

var jwt = require('jsonwebtoken');

// 查
router.post('/login', (req, res) => {
  var _ = new Fuc(res);
  var sql = $sql.login.select;
  var sql_modifyToken = $sql.login.modifyToken;
  var params = req.body;
  //判断必填
  var requireParams = {
    user_name: params.user_name,
    user_password: params.user_password,
  };
  if (!_.require(requireParams)) return false
  _.sqlQuery(sql, [params.user_name, params.user_password], (result) => {
    if (!result.length) {
      _.error(null, '账户或密码错误,请重新登录');
    } else {
      let content ={name:req.body.user_name};// 要生成token的主题信息
      let secretOrPrivateKey = 'hxm';// 这是加密的key（密钥） 
      let token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: 60 * 60 * 1  // 1小时过期
      });
      _.sqlQuery(sql_modifyToken, [token,result[0].account_id], (result2) => { 
        _.success(token, '登录成功');
      })
    }
  })
});

module.exports = router;
