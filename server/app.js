// node 后端服务器入口
const verifyToken = require('./api/verifyToken');
const loginApi = require('./api/loginApi');
const shopApi = require('./api/shopApi');
// const testApi = require('./api/testApi');
// const animateApi = require('./api/animateApi');
const weatherApi = require('./api/weatherApi');
const markdownApi = require('./api/markdownApi');
const uploadApi = require('./api/uploadApi');

// const fs = require('fs');
// const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.all('*', (req, res, next) => { 
  return verifyToken(req, res, next)
})

//注册api路由
app.use('/api', loginApi);
app.use('/api/shop', shopApi);
// app.use('/api/test', testApi);
// app.use('/api/animate', animateApi);
app.use('/api/weather', weatherApi);
app.use('/api/markdown', markdownApi);
app.use('/api/upload', uploadApi);

app.use(express.static('../dist'));

// 监听端口
app.listen(8000, '0.0.0.0');
console.log('success listen at port:8000......');