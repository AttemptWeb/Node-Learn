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
## URL解析 
  在Node js 中，提供了个url解析的模块儿querystring()模块儿
  querystring 模块儿用户URL处理与解析
  ```javascript
  querystring.parse(str,[eq],[options]) //将字符串转成对象
  ```
| 预转换的字符串  |  str  |
| ----------    | ---- |
| 设置分隔符,默认'&'  |  sep  |
| 设置赋值符，默认为'='  |  eq  |
| 可接受字符串的最大度，默认为1000  | [options]  maxKeys |
```javascript 
// 例子
quertystring.parse('foo=bar&baz=qux&baz=quux&corge')
// returns
{foo:'bar',bar:['qux','quux'],corge:''}

// ------
querystring.stringify({name: 'whitemu', sex: [ 'man', 'women' ] });
// returns
'name=whitemu&sex=man&sex=women'
```

#### url 模块提供了一些实用函数 用于URLC处理 与解析
  一个URL 字符串是一个结构化的字符串，它含有多个有意义的组成部分，当被解析时，会返回一个URL 对象，它包含每个组成部分作为属性。
  以下详情描述了一个解析后的URL的每个组成部分
  ```
  ┌─────────────────────────────────────────────────────────────────────────────┐
│                                    href                                     │
├──────────┬┬───────────┬─────────────────┬───────────────────────────┬───────┤
│ protocol ││   auth    │      host       │           path            │ hash  │
│          ││           ├──────────┬──────┼──────────┬────────────────┤       │
│          ││           │ hostname │ port │ pathname │     search     │       │
│          ││           │          │      │          ├─┬──────────────┤       │
│          ││           │          │      │          │ │    query     │       │
"  http:   // user:pass @ host.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          ││           │          │      │          │ │              │       │
└──────────┴┴───────────┴──────────┴──────┴──────────┴─┴──────────────┴───────┘
  ```
  ```url.format(urlObject)``` 回一个从urlObject格式化后的URL字符串 `url.parse(urlString[,parseQueryString])`解析一个URL字符串并返回一个对象
  我们可以使用url.parse()解析出的对象来获取URL对象

## 2.Http客户端
在Node.js中可以很容易的使用Reque方法向其他网站请求数据，也可以使用http.get(optionsl,callback)
```
http.request(options,callback)
```
request方法的options参数,可以是一个对象，也可以是一个字符串，如果是字符串，就表示这是一个URL，Node内部就会自动调用url.parse()，处理这个参数。
http.request()返回一个http.ClientRequest类的实例，它是一个可写的数据流，如果你想通过POST方法发送一个文件，可以将这个文件写入ClientRequest对象中。

## 3.相关的好用的包
 - [express](http://expressjs.org.com)Express 是Koa的爸爸 简洁灵活的Web应用框架，提供一套系列特性创建各种web应用，和丰富的HTTP工具。
 - [request](https://github.com/request/request) request模块让http请求变的更加简单