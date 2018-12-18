var is = require('is-js');
var express = require('express');
var router = express.Router();
var $sql = require('../db/sqlMap');
var _ = require('../utils/utils');



// 编辑接口
router.post('/editMarkdown', (req, res) => {
  var s_add = $sql.markdown.add;
  var s_modify = $sql.markdown.modify;
  var params = req.body;
  if (!_.isRequired(params.markdown_title, res)) return false
  if (is.empty(params.markdown_id)) {
    if (!params.markdown_value) {
      params.markdown_value = '';
    }
    _.sqlQuery(res, s_add, [params.markdown_title, params.markdown_value], (result) => {
      _.isSuccess(res, result.insertId);
    })
  } else {
    _.sqlQuery(res, s_modify, [params.markdown_title, params.markdown_value, params.markdown_id], (result) => {
      _.isSuccess(res, null);
    })
  }
});

//删除
router.post('/delMarkdown', (req, res) => {
  var s_delete = $sql.markdown.delete;
  var params = req.body;
  if (!_.isRequired(params.markdown_id, res)) return false
  _.sqlQuery(res, s_delete, [params.markdown_id], (result) => {
    _.isSuccess(res, null);
  })
});
// 查询动画大类接口
router.post('/getMarkdown', (req, res) => {
  var sql = $sql.markdown.select;
  var params = req.body;
  _.sqlQuery(res, sql, params, (result) => {
    _.isSuccess(res, result);
  })
});

// 查询动画类型接口
// router.post('/getAnimateType', (req, res) => {
//   var sql = $sql.animate.selectTypeForId;
//   var params = req.body;
//   if (!_.isRequired(params, res)) return false
//   //params.effect_id 动画主key
//   _.sqlQuery(res, sql, params.effect_id, (result) => {
//     _.isSuccess(res, result);
//   })
// });

// 查询动画接口
// router.post('/getAnimateAll', (req, res) => {
//   var s_selectType = '';
//   var s_select = $sql.animate.select;
//   var params = req.body;
//   var pageSize = params.limit;
//   var start = 0;
//   if(pageSize){
//     start = (params.page-1)*pageSize;
//     s_selectType ="select * from animate_css_type order by effect_id asc limit " + start + "," + pageSize;
//   }else{
//     s_selectType =$sql.animate.selectType
//   }
//   var fnSqlSelect = () => {
//     _.sqlQuery(res, s_select, params, (result) => {
//       fnSelectType(result)
//     })
//   }
//   var fnSelectType = (animateList) => {
//     _.sqlQuery(res, s_selectType, params, (result) => {
//       fnInitList(result, animateList);
//     })
//   }
//   var fnInitList = (animateTypeList, animateList) => {
//     animateTypeList.forEach(x => {
//       let effect_id = x.effect_id
//       animateList.forEach(y => {
//         if (effect_id == y.effect_id) {
//           x.effect_name = y.effect_name
//         }
//       })
//     })
//     fnSqlCount(animateTypeList)
//   }
//   //获取数量
//   var fnSqlCount = (animateTypeList) => {
//     _.sqlCount(res, 'animate_css_type', (result) => {
//       _.isSuccess(res, {
//         count: result,
//         data: animateTypeList
//       });
//     })
//   }
//   fnSqlSelect();
// });



module.exports = router;
