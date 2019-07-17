###Node中的网络编程
>Node的初衷就是建立一个高效性能的web服务器。
*之前的Node模块，如http,fs,path ... 还有其他诸多常用的模块儿，详情参见文档。

## 网络编程的基本概念

**通过使用套接字来达到进程间的通信目的的编程就是网络编程**
通常情况下，我们要使用的网络提供的功能，可以有以下几种方式：

1. 使用应用软件提供的网络通信功能来获取网络服务，如浏览器，它在应用层上使用http协议，在传输层基于TCP协议；

2. 在命令方式下使用shell命令获取系统提供的网络服务，如telent,ftp等。
  
3. 使用编程的方式通过系统调用获取操作系统提供给我们的网络服务。

对于网络编程的基础，从**OSI的七层协议模型**开始了，除了OSI模型还有**TCP/IP 协议模型**


以FTP为例：
物理层到电缆连接，数据链路层到网卡，网络层路由到主机，传输层到端口，会话层维持会话，表示层表达数据格式，应用层就是具体FTP中的各种命令功能了。

在了解了这些之后，我们可以来看socket了。**socket是在应用层和传输层之间的一个抽象层，它把TCP/IP层复杂的操作抽象为几个简单的接口供应用层调用已实现进程在网络中通信**也就是说socket（套接字）就是将操作系统中对于传输层及其以下各层中对于网络操作的处理进行了封装，然后提供一个socket对象，供我们在应用程序中调用这个对象及其方法来达到进程间通信的目的。
相关链接
- [简单理解Socket](http://www.cnblogs.com/dolphinX/p/3460545.html)
- [全栈必备：网络编程基础](http://blog.jobbole.com/110041/)

###Node中的网络编程
Node.js也提供了对socket的支持，它提供了一个[net(网络)](http://nodejs.cn/api/net.html)模块用来处理和TCP相关的操作，提供了[dgram](http://nodejs.cn/api/dgram.html)模块用来处理UDP(数据报)相关操作
`net` 模块给你提供了一个异步的网络封装. 它包含创建服务器和客户端（称为流）的功能

1.  创建TCP客户端
*net 模块通过`net.createServer`方法创建的TCP服务器*

```javascript
//server.js
const net = require('net');
const serve = net.createServer((socket)=>{
  console.log('客户端链接')
  socket.on('data',(data)=>{
    console.log('监听客户端的数据: ', data.toString())
  })
  //监听断开链接事件
  socket.on('end',(data)=>{
    console.log('客户端断开链接')
  })
  socket.write('哈哈哈我是一个测试')
})
// server start
server.listen(8080,()=>{
  console.log('服务创建')
})
```
2. 创建客户端
*通过`net.connect`方法创建客户端去连接服务器*
```javascript
//server.js
const server = require('net');
const client = net.connect({port:8080},()=>{
  console.log('连接服务器');
  client.write('http://xingxin.me \r\n')
})
// 接收服务端的数据
client.on('data', (data) => {
    console.log('接收服务端的数据: ', data.toString())
    // 断开连接
    client.end()
})
// 断开连接
client.on('end', () => {
    console.log('断开连接')
})
```

现在我们在命令行中执行

```bash
$ node server.js

# 再开一个命令行执行
$ node client.js
连接服务器
接收服务端的数据:  哈哈哈，我是一个测试

断开连接


$ node server.js
server bound
客户端连接
监听客户端的数据:  http://xingxin.me

客户端断开连接
```

### 简易聊天室
####1.聊天室的服务端
```javascript
const net = require('net')
const server = net.createServer()
let sockets = []
server.on('connection',(data)=>{
  console.log('Got a new connection');
  sockets.push(socket);
  socket.on('data',(data)=>{
    sockets.forEach((otherSocket)=>{
      if(otherSocket!==socket){
        otherSocket.write(data)
      }
    })
  })
  socket.on('close', function() {
    console.log('A client connection closed')
    let index = sockets.indexOf(socket)
    sockets.splice(index, 1)
  })
})
sever.on('error',(err)=>{
  console.log('Server error :',err.message)
})
server.on('close',()=>{
  console.log('Server closed')
})
server.listen(8080)
```

####2.聊天室的客户端
```javascript
const net = require('net')
process.stdin.resume()
process.stdin.setEncoding('utf8');
const client = net.connect({port:8080},()=>{
  console.log('input:')
  process.stdin.on('data',(data)=>{
    console.log('input：')
    client.write(data)
    if(data==='close\n'){
      client.end()
    }
  })
})
client.on('data',(data)=>{
  console..log('Othen user\'s input',data.toString())
})
client.on('end',()=>{
  console.log('Disconnected frome server')
  process.exit()
})
```
在命令行中`node server.js`启动一个服务器，然后用`node client.js`启动多个客户端