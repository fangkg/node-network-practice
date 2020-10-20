const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    const { method, url, headers } = req;
    const { cookie } = headers
    if (method == "GET" && url == "/") {
        fs.readFile("./index.html", (err, data) => {
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        })
    } else if (method == "GET" && url == "/api/users") {
        res.setHeader("Content-Type", "application/json");
        // 跨域 声明
        res.setHeader('Access-control-Allow-Origin', 'http://localhost:3000');
        // 设置cookie
        res.setHeader('Set-Cookie', 'cookie1=1234');
        // 允许认证
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.end(JSON.stringify([{ name: 'tom', age: 20 }]));
    } else if (method == "OPTIONS" && url == "/api/users") {
        // 预检请求
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Headers": "X-Token,Content-Type",
            "Access-Control-Allow-Methods": "PUT"
        })
        res.end();
    } else if (method === "POST" && url === '/api/save') {
        // 接收流
        let retData = [];
        let size = 0;
        // 接收数据
        req.on('data', data => {
            // data为二进制 Buffer
            console.log('data:', data)
            retData.push(data);
            size += data.length;
        })
        // 接收数据结束
        req.on('end', () => {
            const data = Buffer.concat(retData, size);
        })
    }
}).listen(4000, () => {
    console.log('api listen at' + 4000);
})