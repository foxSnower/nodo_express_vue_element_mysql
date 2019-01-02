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
  var params = req.body;
  //判断必填
  var requireParams = {
    shop_name: params.shop_name,
    goods_name: params.goods_name,
    shop_address: params.shop_address,
    shop_manager: params.shop_manager,
    shop_phone: params.shop_phone,
    shop_IDCard: params.shop_IDCard,
  };
  if (!_.require(requireParams)) return false
  if (is.empty(params.shop_id)) {
    _.sqlQuery(s_add, [params.shop_name, params.goods_name, params.shop_address, params.shop_manager, params.shop_phone, params.shop_IDCard], (result) => {
      _.success(result.insertId);
    })
  } else {
    _.sqlQuery(s_modify, [params.shop_name, params.goods_name, params.shop_address, params.shop_manager, params.shop_phone, params.shop_IDCard, params.shop_id], (result) => {
      _.success(null);
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
  _.sqlQuery(sql, params, (result) => {
    result = _.filterDataOfTime(result);
    _.success(result);
  })
});

module.exports = router;
