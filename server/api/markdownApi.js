var is = require('is-js');
var express = require('express');
var router = express.Router();
var $sql = require('../db/sqlMap');
var Fuc = require('../utils');

// 增改
router.post('/editMarkdown', (req, res) => {
  var _ = new Fuc(res);
  var s_add = $sql.markdown.add;
  var s_modify = $sql.markdown.modify;
  var params = req.body;
  if (!_.require(params.markdown_title)) return false
  if (is.empty(params.markdown_id)) {
    if (!params.markdown_value) {
      params.markdown_value = '';
    }
    _.sqlQuery(s_add, [params.markdown_title, params.markdown_value], (result) => {
      _.success(result.insertId);
    })
  } else {
    _.sqlQuery(s_modify, [params.markdown_title, params.markdown_value, params.markdown_id], (result) => {
      _.success(null);
    })
  }

});

//删
router.post('/delMarkdown', (req, res) => {
  var _ = new Fuc(res);
  var s_delete = $sql.markdown.delete;
  var params = req.body;
  if (!_.require(params.markdown_id)) return false
  _.sqlQuery(s_delete, [params.markdown_id], (result) => {
    _.success(null);
  })
});

// 查
router.post('/getMarkdown', (req, res) => {
  var _ = new Fuc(res);
  var sql = $sql.markdown.select;
  var params = req.body;
  _.sqlQuery(sql, params, (result) => {
    _.success(result);
  })
});

module.exports = router;
