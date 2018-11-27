var is = require('is-js');
var express = require('express');
var router = express.Router();
var $sql = require('../db/sqlMap');
var _ = require('../utils/utils');

// 增加接口
router.post('/addAnimate', (req, res) => {
  var sqlAdd = $sql.animate.add;
  var sqlAddType = $sql.animate.addType;
  var params = req.body;
  /**
   * effect_id 空 => 新增 animate_css 表 ,再新增 animate_css_type 表
   * effect_id    => effect_type_id 空 => 新增 animate_css_type 表
   *                 effect_type_id    => 修改 animate_css_type 表
   */
  if (!_.isRequired(params.effect_name, res)) return false
  if (!_.isRequired(params.effect_type_code, res)) return false
  if (!_.isRequired(params.effect_type_name, res)) return false
  if (is.empty(params.effect_id)) {

  } else {
    if (is.empty(params.effect_type_id)) {
      _.sqlQuery(res, sqlAddType, [params.effect_id, params.effect_type_code, params.effect_type_name], (result) => {
        _.isSuccess(res, result, '操作成功');
      })
    } else {

    }
  }

  // if (!_.isRequired(params, res)) return false
  // _.sqlQuery(res, sqlAdd, [params.effect_id, params.effect_name], (result) => {
  //   _.isSuccess(res, result, '操作成功');
  // })
  // _.sqlQuery(res, sqlAddType, [params.effect_type_id, params.effect_id, params.effect_type_code, params.effect_type_name], (result) => {
  //   _.isSuccess(res, result, '操作成功');
  // })
});
// 查询动画大类接口
router.post('/getAnimate', (req, res) => {
  var sql = $sql.animate.select;
  var params = req.body;
  _.sqlQuery(res, sql, params, (result) => {
    _.isSuccess(res, result, '操作成功');
  })
});

// 查询动画类型接口
router.post('/getAnimateType', (req, res) => {
  var sql = $sql.animate.selectTypeForId;
  var params = req.body;
  if (!_.isRequired(params, res)) return false
  //params.effect_id 动画主key
  _.sqlQuery(res, sql, params.effect_id, (result) => {
    _.isSuccess(res, result, '操作成功');
  })
});

// 查询动画接口
router.post('/getAnimateAll', (req, res) => {
  var selectType = $sql.animate.selectType;
  var sqlSelect = $sql.animate.select;
  var params = req.body;
  var fnSqlSelect = () => {
    _.sqlQuery(res, sqlSelect, params, (result) => {
      fnSelectType(result)
    })
  }
  var fnSelectType = (animateList) => {
    _.sqlQuery(res, selectType, params, (result) => {
      fnInitList(result, animateList);
    })
  }
  var fnInitList = (animateTypeList, animateList) => {
    animateTypeList.forEach(x => {
      let effect_id = x.effect_id
      animateList.forEach(y => {
        if (effect_id == y.effect_id) {
          x.effect_name = y.effect_name
        }
      })
    })
    _.isSuccess(res, animateTypeList, '操作成功');
  }
  fnSqlSelect();
});

module.exports = router;
