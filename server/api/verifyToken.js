var is = require('is-js');
var express = require('express');
var router = express.Router();
var $sql = require('../db/sqlMap');
var Fuc = require('../utils');

var jwt = require('jsonwebtoken');

const secretOrPrivateKey = () => {
  return 'hxm';// 这是加密的key（密钥） 
}



verifyToken = (req, res, next) => {
  if (req.url !== '/api/login') {
    var _ = new Fuc(res);
    var sql = $sql.account.selectForId;
    // 获得客户端的Cookie
    var Cookies = {};
    req.headers.cookie && req.headers.cookie.split(';').forEach(function (Cookie) {
      var parts = Cookie.split('=');
      Cookies[parts[0].trim()] = (parts[1] || '').trim();
    });
    //解析token
    var getAccountId = (fn) => {
      if (!Cookies.FETRUEREFRESHTOKEN) {
        return _.error(null,'token失效');
      } else {
        return jwt.verify(Cookies.FETRUEREFRESHTOKEN, secretOrPrivateKey(), function (err, decode) {
          if (err) {
            return fn(null)
          } else {
            if (fn) {
              return fn(decode.id)
            } else {
              return decode.id
            }
          }
        })
      }
    }
    //根据账户id获得当前用户refreshToken
    var curRefreshToken = (id, fn) => {
      return _.sqlQuery(sql, [id], async (result) => {
        if (fn) {
          if (result.length) {
            return fn(result)
          }
        } else {
          return result
        }

      })
    }
    getAccountId((id) => {
      curRefreshToken(id, (result) => {
        if (result[0].refresh_token == Cookies.FETRUEREFRESHTOKEN) {
          next();
        } else {
          _.error(null,'token失效');
        }
      })
    })
  } else {
    next();
  }
}


module.exports = verifyToken;
