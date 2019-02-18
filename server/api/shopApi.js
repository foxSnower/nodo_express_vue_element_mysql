var is = require('is-js');
var express = require('express');
var router = express.Router();
var $sql = require('../db/sqlMap');
var Fuc = require('../utils');

// 增改
router.post('/editShop', (req, res) => {
  var _ = new Fuc(res);
  var s_add = $sql.shop.add;
  var s_modify = $sql.shop.modify;
  var s_add_account = $sql.account.addMainAccount;
  var s_modify_account = $sql.account.modifyMainAccount;
  var params = req.body;
  //判断必填
  var requireParams = {
    shop_name: params.shop_name,
    goods_name: params.goods_name,
    shop_address: params.shop_address,
    shop_manager: params.shop_manager,
    shop_phone: params.shop_phone,
    shop_IDCard: params.shop_IDCard,
    user_name: params.user_name,
    password: params.password,
  };
  //新增商户信息
  let addShop = (params,fn) => {
    return _.sqlQuery(s_add, [params.shop_name, params.goods_name, params.shop_address, params.shop_manager, params.shop_phone, params.shop_IDCard, params.user_name, params.password], (result) => {
      return fn(result);
    })
  }
  //修改商户信息
  let modifyShop = (params,fn) => {
    return _.sqlQuery(s_modify, [params.shop_name, params.goods_name, params.shop_address, params.shop_manager, params.shop_phone, params.shop_IDCard, params.user_name, params.password, params.shop_id], (result) => {
      return fn(result);
    })
  }
  //新增账户信息
  let addAccount = (params,fn) => {
    return _.sqlQuery(s_add_account, [params.shop_id, params.user_name, params.password,'1,2,3,4,5,8,9',1,'主账户'], (result) => {
      return fn(result);
    })
  }
  //修改账户信息
  let modifyAccount = (params,fn) => {
    return _.sqlQuery(s_modify_account, [params.user_name, params.password,params.shop_id], (result) => {
      return fn(result);
    })
  }
  if (!_.require(requireParams)) return false
  if (is.empty(params.shop_id)) {
    addShop(params, (result) => {
      params.shop_id = result.insertId;
      addAccount(params, (result2) => {
        _.success();
      })
    })
  } else {
    modifyShop(params, (result) => { 
      modifyAccount(params, (result2) => {
        _.success();
      })
    })
  }
});

//删
router.post('/delShop', (req, res) => {
  var _ = new Fuc(res);
  var s_delete = $sql.shop.delete;
  var params = req.body;
  //判断必填
  var requireParams = { shop_id: params.shop_id };
  if (!_.require(requireParams)) return false
  _.sqlQuery(s_delete, [params.shop_id], (result) => {
    _.success(null);
  })
});

// 查
router.post('/getShop', (req, res) => {
  var _ = new Fuc(res);
  var sql = $sql.shop.select;
  var params = req.body;
  var pageSize = params.limit;
  var shop_id = params.shop_id;
  var start = 0;
  if (pageSize) {
    //分页
    start = (params.page - 1) * pageSize;
    sql = "select * from shops order by shop_id asc limit " + start + "," + pageSize;
    _.sqlQuery(sql, params, (result1) => {
      result1 = _.filterDataOfTime(result1);
      //获取数量
      _.sqlCount('shops', (result2) => {
        _.success({
          count: result2,
          data: result1
        });
      })
    })
  } else {
    if (shop_id) {
      //按id查找
      sql = "select * from shops where shop_id in (?)";
      _.sqlQuery(sql, [shop_id], (result) => {
        result = _.filterDataOfTime(result);
        _.success(result[0]);
      })
    } else {
      //全部
      sql = $sql.shop.select;
      _.sqlQuery(sql, params, (result) => {
        result = _.filterDataOfTime(result);
        _.success(result);
      })
    }
  }

});

module.exports = router;
