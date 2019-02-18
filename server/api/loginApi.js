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
const expiresTime = 1000 * 60 * 2;//2小时
const getToken = (content, key) => {
  return jwt.sign(content, key, { expiresIn: expiresTime });
}
const verifyToken = () => {

}


//生成token,并存入数据库中-在一定时间后修改token值
const signToken = (_, id, result, callback) => {
  var sql_modifyToken = $sql.account.modifyToken;
  var sql_modifyRefreshToken = $sql.account.modifyRefreshToken;
  var sql_modifyTokens = $sql.account.modifyTokens;
  let content = { id: id };// 要生成token的主题信息
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
  var sql = $sql.account.select;
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
      signToken(_, result[0].account_id, result, (token) => {
        _.success(token, '登录成功');
      })
    }
  })
});

// 获取token
router.get('/getToken', (req, res) => {
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
      return _.error(null, 'token失效');
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
    return _.sqlQuery(sql, [id], (result) => {
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
        //生成token
        signToken(_, id, result, (token) => {
          _.success(token, '更新token成功');
        })
      } else {
        _.error('更新token失败');
      }
    })
  })
});

// 获取用户权限菜单
router.get('/getMenu', (req, res) => {
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
      return _.error(null, 'token失效');
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
  //根据账户id获得当前用户菜单权限
  var curMenu = (id, fn) => {
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
  //查询菜单
  let selectMenu = (fn) => {
    let sql = $sql.menu.select;
    return _.sqlQuery(sql, [], (result) => {
      return fn(result);
    })
  }
  //初始化菜单
  let initMenu = (list, fn) => {
    let newList = [];
    let listCopy = Object.assign(list);
    list.forEach(x => {
      if (x.parent_id != null) {
        listCopy.forEach(y => {
          if (x.parent_id == y.menu_id) {
            if (y.children) {
              y.children.push(x);
            } else {
              y.children = [];
              y.children.push(x);
            }
          }
        })
      }
    })
    listCopy.forEach(x => {
      if (x.parent_id == null) {
        newList.push(x);
      }
    })
    return fn(newList);
  }
  getAccountId((id) => {
    curMenu(id, (menu) => {
      let menus = menu[0].menu_list.split(',');
      selectMenu((menuList) => {
        let curMenuList = [];
        menuList.forEach(x => {
          menus.forEach(y => {
            if (x.menu_id == y) {
              curMenuList.push(x);
            }
          })
        })
        initMenu(curMenuList, (newMenu) => {
          _.success(newMenu);
        })

      })
    })
  })
});


module.exports = router;
