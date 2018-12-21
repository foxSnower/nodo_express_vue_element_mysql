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


module.exports = router;
