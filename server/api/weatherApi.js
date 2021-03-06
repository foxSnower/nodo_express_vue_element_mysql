var is = require('is-js');
var express = require('express');
var router = express.Router();
var request = require('request-promise');
var dns = require('dns');
var crypto = require('crypto');
var querystring = require('querystring');
var $sql = require('../db/sqlMap');
var Fuc = require('../utils');


//获取url请求客户端ip
var get_client_ip = function (req) {
  var ip = req.headers['x-forwarded-for'] ||
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress || '';
  if (ip.split(',').length > 0) {
    ip = ip.split(',')[0]
  }
  return ip;
};

//用IP地址搜索城市--获取当前用户IP
router.post('/searchCity', (req, res) => {
  var _ = new Fuc(res);
  var params = req.body;
  params.language = 'zh-Hans';
  params.key = 'fvfnflrb5vji9ga6';
  //获取外网Ip
  request({
    url: 'http://ifconfig.me/ip',
  }).then(function (result) {
    params.q = result;
    params.unit = 'c';
    var sig = {};
    sig.ts = Math.floor((new Date()).getTime() / 1000); // 当前时间戳（秒）
    sig.ttl = 300; // 过期时间
    sig.uid = 'U78C3EBCDE'; // 用户ID
    var str = querystring.encode(sig); // 构造请求字符串
    // 使用 HMAC-SHA1 方式，以 API 密钥（key）对上一步生成的参数字符串进行加密
    params.sig = crypto.createHmac('sha1', 'fvfnflrb5vji9ga6')
      .update(str)
      .digest('base64'); // 将加密结果用 base64 编码，并做一个 urlencode，得到签名 sig
    request({
      url: 'https://api.seniverse.com/v3/location/search.json',
      qs: params,
      json: true
    }).then(function (result) {
      _.success(result.results[0]);
    }).catch(function (err) {
      _.error(err, '请求失败');
    });
  }).catch(function (err) {
    _.error(err, '请求失败');
  });

})

// 查询心知天气3天预报
router.post('/getDailyWeather', (req, res) => {
  var _ = new Fuc(res);
  var params = req.body;
  params.language = 'zh-Hans';
  params.key = 'fvfnflrb5vji9ga6';
  params.unit = 'c';
  var sig = {};
  sig.ts = Math.floor((new Date()).getTime() / 1000); // 当前时间戳（秒）
  sig.ttl = 300; // 过期时间
  sig.uid = 'U78C3EBCDE'; // 用户ID
  var str = querystring.encode(sig); // 构造请求字符串
  // 使用 HMAC-SHA1 方式，以 API 密钥（key）对上一步生成的参数字符串进行加密
  params.sig = crypto.createHmac('sha1', 'fvfnflrb5vji9ga6')
    .update(str)
    .digest('base64'); // 将加密结果用 base64 编码，并做一个 urlencode，得到签名 sig
  request({
    url: 'https://api.seniverse.com/v3/weather/daily.json',
    qs: params,
    json: true
  }).then(function (result) {
    _.success(result.results[0]);
  }).catch(function (err) {
    _.success(err, '请求失败');
  });
})


// 查询心知天气实况
router.post('/getWeather', (req, res) => {
  var _ = new Fuc(res);
  var params = req.body;
  params.language = 'zh-Hans';
  params.key = 'fvfnflrb5vji9ga6';
  params.unit = 'c';
  var sig = {};
  sig.ts = Math.floor((new Date()).getTime() / 1000); // 当前时间戳（秒）
  sig.ttl = 300; // 过期时间
  sig.uid = 'U78C3EBCDE'; // 用户ID
  var str = querystring.encode(sig); // 构造请求字符串
  // 使用 HMAC-SHA1 方式，以 API 密钥（key）对上一步生成的参数字符串进行加密
  params.sig = crypto.createHmac('sha1', 'fvfnflrb5vji9ga6')
    .update(str)
    .digest('base64'); // 将加密结果用 base64 编码，并做一个 urlencode，得到签名 sig
  request({
    url: 'https://api.seniverse.com/v3/weather/now.json',
    qs: params,
    json: true
  }).then(function (result) {
    _.success(result.results[0]);
  }).catch(function (err) {
    _.success(err, '请求失败');
  });
})



module.exports = router;
