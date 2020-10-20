// 代理
const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();
// 提供当前目录为运行目录
app.use(express.static(__dirname + '/'))
// 转发代理
app.use('/api', proxy({ target: 'http://localhost:4000' }));
app.listen(3000);