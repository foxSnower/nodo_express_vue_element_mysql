var is = require('is-js');
var express = require('express');
var router = express.Router();
var $sql = require('../db/sqlMap');
var Fuc = require('../utils');

//是nodejs中处理multipart/form-data数据格式(主要用在上传功能中)的中间件
//文档：https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
const multer = require('multer')

//配置diskStorage来控制文件存储的位置以及文件名字等
var storage = multer.diskStorage({
  //确定图片存储的位置
  destination: function (req, file, cb) {
    cb(null, '../static/upload')
  },
  // ![](http://images2017.cnblogs.com/blog/1283058/201802/1283058-20180201154342296-515041615.png)

  //确定图片存储时的名字,注意，如果使用原名，可能会造成再次上传同一张图片的时候的冲突
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
});
//生成的专门处理上传的一个工具，可以传入storage、limits等配置
var upload = multer({ storage: storage });
// 编辑接口
router.post('/', upload.single('fileList'), (req, res) => {
  var _ = new Fuc(res);
  //图片已经被放入到服务器里,且req也已经被upload中间件给处理好了（加上了file等信息）
  //线上的也就是服务器中的图片的绝对地址
  var url = '/static/upload/' + req.file.filename
  _.success(url);
});




module.exports = router;
