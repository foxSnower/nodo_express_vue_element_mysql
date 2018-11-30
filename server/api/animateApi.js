var is = require('is-js');
var express = require('express');
var router = express.Router();
var $sql = require('../db/sqlMap');
var _ = require('../utils/utils');

// 编辑接口
router.post('/editAnimate', (req, res) => {
  var s_add = $sql.animate.add;
  var s_addType = $sql.animate.addType;
  var s_modifyType = $sql.animate.modifyType;
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
    _.sqlQuery(res, s_add, [params.effect_name], (result) => {
      let insertId = result.insertId;
      _.sqlQuery(res, s_addType, [insertId, params.effect_type_code, params.effect_type_name], (result2) => {
        _.isSuccess(res, null);
      })
    })
  } else {
    if (is.empty(params.effect_type_id)) {
      _.sqlQuery(res, s_addType, [params.effect_id, params.effect_type_code, params.effect_type_name], (result) => {
        _.isSuccess(res, null);
      })
    } else {
      _.sqlQuery(res, s_modifyType, [params.effect_id, params.effect_type_code, params.effect_type_name, params.effect_type_id], (result) => {
        _.isSuccess(res, null);
      })
    }
  }
});
//删除
router.post('/deleteAnimate', (req, res) => {
  var s_deleteType = $sql.animate.deleteType;
  var params = req.body;
  if (!_.isRequired(params.effect_type_id, res)) return false
  _.sqlQuery(res, s_deleteType, [params.effect_type_id], (result) => {
    _.isSuccess(res, null);
  })
});
// 查询动画大类接口
router.post('/getAnimate', (req, res) => {
  var sql = $sql.animate.select;
  var params = req.body;
  _.sqlQuery(res, sql, params, (result) => {
    _.isSuccess(res, result);
  })
});

// 查询动画类型接口
router.post('/getAnimateType', (req, res) => {
  var sql = $sql.animate.selectTypeForId;
  var params = req.body;
  if (!_.isRequired(params, res)) return false
  //params.effect_id 动画主key
  _.sqlQuery(res, sql, params.effect_id, (result) => {
    _.isSuccess(res, result);
  })
});

// 查询动画接口
// router.post('/getAnimateAll', (req, res) => {
//   var s_selectType = $sql.animate.selectType;
//   var s_select = $sql.animate.select;
//   var params = req.body;
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
//     //以effect_id排序
//     animateTypeList.sort(_.sortBy('effect_id'));
//     _.isSuccess(res, animateTypeList);
//   }
//   fnSqlSelect();
// });

// 查询动画接口
router.post('/getAnimateAll', (req, res) => {
  var s_selectType = '';
  var s_select = $sql.animate.select;
  var params = req.body;
  var pageSize = params.limit;
  var start = 0;
  if(pageSize){
    start = (params.page-1)*pageSize;
    s_selectType ="select * from animate_css_type order by effect_id asc limit " + start + "," + pageSize;
  }else{
    s_selectType =$sql.animate.selectType
  }
  var fnSqlSelect = () => {
    _.sqlQuery(res, s_select, params, (result) => {
      fnSelectType(result)
    })
  }
  var fnSelectType = (animateList) => {
    _.sqlQuery(res, s_selectType, params, (result) => {
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
    fnSqlCount(animateTypeList)
  }
  //获取数量
  var fnSqlCount = (animateTypeList) => {
    _.sqlCount(res, 'animate_css_type', (result) => {
      _.isSuccess(res, {
        count: result,
        data: animateTypeList
      });
    })
  }
  fnSqlSelect();
});



module.exports = router;
