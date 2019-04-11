# Http模块儿
## 1.Http服务器
1. 首先使用http服务器和客户端必须require('http')
2. 然后使用`http.creacteServer([requestListener])`来创建一个web服务器，其中传入一个可选的回调函数，这个回调函数有两个参数分别代表客户端请求与服务端响应的对象
3. 使用`server.listen([port][,hostname][,backlog][,callback])`开始在指定 port 和hostname上接受连接
- 简单三步一个http服务器 建好，有打开就有关闭
```javascript
server.close([callback])
```
- Node.jsHttp模块儿 提供了server.timeout 用于查看或者设置超时
```javascript
  server.timeout = 1000 //设置超时时间
  console.log(sever.timeout)
```
## 2.获取客户端信息
#### request对象
 - request.url 客户端请求的url地址
 - request.headers 客户端请求的http header
 - request.method 获取请求方式，一般有post get delete等
 - request.httpVersion 获取http版本
 - request.trailers 存放附加的一些http头的信息
 - request.socket 用于监听客户端请求的 socket对象
#### response对象
 - response.writeHead(statusCode,[resonPhrase],[headers])
 - response.statusCode 返回状态值
 - response.header 返回的http header 可以是字符串也可以是对象
 - response.setTimeout(msecs,callback) 设置http超时返回的时间，一旦超过设定的时间，连接就被丢弃
 - response.setHeader(name,value) 设置http协议头
 - response.headersSent 判断是否设置http的头
 - response.write(chunk,[encoding]) 返回网页数据, [encoding]默认是utf-8 
 - response.end([data],[encoding]) 
