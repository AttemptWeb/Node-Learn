# Http模块儿
## 1.Http服务器
1. 首先使用http服务器和客户端必须require('http')
2. 然后使用`http.creacteServer([requestListener])`来创建一个web服务器，其中传入一个可选的回调函数，这个回调函数有两个参数分别代表客户端请求与服务端响应的对象
3. 使用`server.listen([port][,hostname][,backlog][,callback])`开始在指定 port 和hostname上接受连接