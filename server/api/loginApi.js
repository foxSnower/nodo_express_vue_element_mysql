var is = require('is-js');
var express = require('express');
var router = express.Router();
var $sql = require('../db/sqlMap');
var Fuc = require('../utils');

var jwt = require('jsonwebtoken');


const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

const secretOrPrivateKey = () => {
  return 'hxm';// 这是加密的key（密钥） 
}
//token失效时间
const expiresTime = 60*60*2;
const getToken = (content, key) => {
  return jwt.sign(content, key, { expiresIn: expiresTime });
}
const verifyToken = () => {
  
}


//生成token,并存入数据库中-在一定时间后修改token值
const signToken = (_, name, result, callback) => {
  var sql_modifyToken = $sql.login.modifyToken;
  var sql_modifyRefreshToken = $sql.login.modifyRefreshToken;
  var sql_modifyTokens = $sql.login.modifyTokens;
  let content = { name: name };// 要生成token的主题信息
  let token = getToken(content, secretOrPrivateKey());
  let refresh_token = token;
  _.sqlQuery(sql_modifyTokens, [token, refresh_token, result[0].account_id], () => {
    setTimeoutPromise(expiresTime).then(() => {
      // 在大约 expiresTime 毫秒后执行。
      token = getToken(content, secretOrPrivateKey());
      _.sqlQuery(sql_modifyToken, [token, result[0].account_id])
    });
    setTimeoutPromise(expiresTime * 2).then(() => {
      // 在大约 expiresTime 毫秒后执行。
      _.sqlQuery(sql_modifyRefreshToken, ['', result[0].account_id])
    });
    callback(token);
  })
}

// 登录
router.post('/login', (req, res) => {
  var _ = new Fuc(res);
  var sql = $sql.login.select;
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
      //生成token
      signToken(_, req.body.user_name, result, (token) => {
        _.success(token, '登录成功');
      })
    }
  })
});

// 获取token
router.post('/getToken', (req, res) => {
  var _ = new Fuc(res);
  var sql = $sql.login.select;
  var params = req.body;
  // 获得客户端的Cookie
  var Cookies = {};
  req.headers.cookie && req.headers.cookie.split(';').forEach(function (Cookie) {
    var parts = Cookie.split('=');
    Cookies[parts[0].trim()] = (parts[1] || '').trim();
  });
  _.success(Cookies, '成功');
  // jwt.verify(Cookies.FETRUETOKEN, secretOrPrivateKey(), function (err, decode) {
  //   _.success(decode, '成功');
  //   console.log(decoded.name) // bar
  // })
 
  console.log(Cookies)
  // if (!_.require(requireParams)) return false
  // _.sqlQuery(sql, [params.user_name, params.user_password], (result) => {
  //   if (!result.length) {
  //     _.error(null, '账户或密码错误,请重新登录');
  //   } else {
  //     //生成token
  //     signToken(_, req.body.user_name, result, (token) => {
  //       let data = {
  //         token,
  //         refresh_token:token
  //       }
  //       _.success(data, '登录成功');
  //     })
  //   }
  // })
});

module.exports = router;
