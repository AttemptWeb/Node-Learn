#  🔨Node入门教程-搭建静态文件服务器
> 通过前面的几篇介绍，我们这个教程算正式打开Node开发的大门，学习了[环境搭建](../lesson1)、然后为了提高各位看官的新趣粗略的介绍了[Http模块](../lesson2)、之后又了解了[Node的模块](../lesson3)。之前说过，**我们将通过实例来学习Node**，从这一篇开始，我们就将用实例来学习各个模块。
> 这一节我们将学习[File System (文件系统)](http://nodejs.cn/api/fs.html)以及[Path(路径)](http://nodejs.cn/api/path.html))并结合之前学习的知识打造 🔨一个Node静态文件服务器

## Node.js文件系统
> Node.js提供本地文件的读写能力，基本类似UNIX(POSIX)的标准文件操作API。所有的方法都有异步和同步，例如读取文件内容的函数有异步的fs.readFile()和同步的fs.readFileSync()。

异步的方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误的信息(error)，则第一个参数会是null或者undefined。
``` javascript
const fs =require('fs')
fs.readFile('READE.md',function(err,data)=>{
  if(err){
    return console.error(err)
  }
  console.log('异步加载'+data.toString())
})
console.log('程序执行完毕')
```
结果：`程序执行完毕`会被打印出

```javascript
const fs = require('fs')
const data = fs.readFileSync('README.md')
console.log('同步读取'+data.toString())
console.log('程序执行完毕','')
```
结果：`程序执行完毕` 后打印出来，强烈推荐大家用异步方法，异步方法性能更高，速度更快，而且没阻塞

#### 写入文件
``` javascript 
fs.writeFile(file,data[,options],callback)
```
参数说明
- file 文件名或者文件描述符
- data 要写入文件的数据，可以是String 或者Buffer(流)对象
- options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'，*如果是一个字符串，则它指定了字符编码
- callback 回调函数

以追加模式往README.md 写入字符串Hello Node.js
``` javascript
fs.writeFile('READE.md','Hello world',{flag:'a+'},(err)=>{
  if(err) throw err
  console.log('It\`saved!')
})
```
这里介绍下`flags`:
| Falg | 描述   |
| --- | -----------|
| r | 以读取模式打开文件。如果文件不存在抛出异常。|
| r+   | 以读写模式打开文件。如果文件不存在抛出异常。       |
| rs   | 以同步的方式读取文件。                    |
| rs+  | 以同步的方式读取和写入文件。                 |
| w    | 以写入模式打开文件，如果文件不存在则创建。         |
| w+   | 以读写模式打开文件，如果文件不存在则创建。          |
| wx+  | 类似 'w+'， 但是如果文件路径存在，则文件读写失败。   |
| a    | 以追加模式打开文件，如果文件不存在则创建。          |
| ax   | 类似 'a'， 但是如果文件路径存在，则文件追加失败。    |
| a+   | 以读取追加模式打开文件，如果文件不存在则创建。        |
| ax+  | 类似 'a+'， 但是如果文件路径存在，则文件读取追加失败。 |

### 打开文件
- 同步`fs.open(path,flags[,mode],callback)`
- 异步`fs.openSync(path,flags[,mode])`

参数说明：

- `path` - 文件的路径
- `flags`  - 文件打开的行为。具体值详见下文
- `mode ` - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)
- `callback` - 回调函数，带有两个参数如：callback(err, fd)

``` javascript
fs.open('README.md','r+',(err,id)=>{
  if(err){
    return console.log(err)
  }
  console.log('文件打开成功')
})
```

### 读取文件
``` javascript
fs.read(fd,buffer,offerset,length,position,callback)
```

参数说明：
-  `fd` - 通过fs.open() 方法返回的文件描述符
- `buffer` -  是数据将被写入到的 buffer
- `offset` -  是buffer中开始写入的偏移量
- `length` - 是一个整数，指定要读取的字节数
- `position` -  是一个整数，指定从文件中开始读取的位置，如果`positiono`为`null`，则数据从当前文件位置的开始读取
- `callback` - 回调函数， 有三个参数err, bytesRead ,buffer,err 为错误信息，bytesRead 表示读取的字节数，buffer为缓冲区对象

``` javascript 
const fs = require('fs');
let buf = new Buffer(1024);
fs.open('README.md','r+',(err,fd)=>{
  if(err){
    return console.error(err)
  }
  fs.read(fd,buf,0,buf.length,0,(err,bytes)=>{
    if(err){
      console.log(err)
    }
    console.log(bytes+'字节被读取')
    // 仅输出读取的字节
    if(bytes>0){
      console.log(buf.slice(0,bytes).toString())
    }
  })
})
```
这样就可以从README.md中读取1024B的文件
#####读取目录
readdir方法 用于读取目录，返回一个所包含的文件和子目录
```js
fs.readdir(path[,options],callback)
```
同步版本
```js
fs.readdirSync(path[,options])
```
目录遍历方法
遍历时一般使用深度优先+先序遍历算法
```js
const travle = (dir,callback) =>{
  fs.readdirSync(dir).forEach(function(file){
    const pathname = path.join(dir,file)
    if(fs.statSync(pathmae).isDirectory()){
      travele(pathname,callback)
    }else{
      callback(pathname)
    }
  })
}
```
该函数是以目录为遍历起点，偶遇子目录进行子目录的遍历，遇到一个文件的时候 就把文件的绝对路径传给回调函数，回调函数拿到文件的path的时候，进行对应处理
```javascript
travel(_dirname,(pathname)=>{
  console.log(pathname)
})
```

###Path模块儿
> `path`模块提供工具函数，用于处理文件与目录的路径,`path`模块的默认操作会根据Node.js  应用程序的运行环境的不同而发生变化。Windows和Mac的path风格不同
常用的方法介绍
`path.join([...patins])`方法进行路径的链接
```js
path.join('foo','foo1')
// Return /foo/foo1
path.josn('foo',{},'bar')
// Return Throw Error:path.join 的参数必须为字符串
```

`path.resolve()`方法把一个路径或路径片段的序列解析为一个绝对路径方法用于将相对路径转为绝对路径

```js
path.resolve('/foo/bar1','./bar1')
// return /foo/bar1/bar1
path.resolve('/foo/haha', '/tmp/file/')
// 返回: '/tmp/file'
path.resolve('root','static/png/','../gf/test.gif')
// 如果当前目录为/work/my/node
// return /work/my/node/root/static/gf/test.gif
```

`path.extname()`方法返回一个`path`的扩展名 ，即从`path`的最后一个部分`.`（句号）字符到字符串结束=>拿文件的名

```js
path.extname('index.html')
// 返回: '.html'

path.extname('index.md')
// 返回: '.md'
```
关于Path (路径)的更多API请自行查看[Node中文网](http://nodejs.cn/api/path.html)

###Node静态文件服务器
#####1.启http服务器
文件服务器简述其流程：浏览器发送URL，服务端解析URL，对应到硬盘上的文件里，返回200状态码，并发送文件到浏览器。
- First:新建一个file-server
- npm init 初始化生成package.json
- 新建index.js文件
```js
const http = require('http');
const hostname = '127.0.0.1'
const port = 3000
const server = http.createServer((req,res)=>{
  res.statuCode = 200;
  res.setHeader('Content-Type','text/plain');
  res.end('Hello World\n');
})
server.listen(port,()=>{
  console.log(`服务器运行在http://${hostname}:${port}`)
})
```
可用[supervisor](https://github.com/petruisfan/node-supervisor)实时监听文件修改
并且自动重启应用=>不需要再次重启应用
```
$ supervisor --harmony index.js
Running node-supervisor with
  program '--harmony index.js'
  --watch '.'
  --extensions 'node,js'
  --exec 'node'

Starting child process with 'node --harmony index.js'
Watching directory '/Users/lx/Documents/workspace/node-abc/lesson4/file-server' for changes.
Press rs for restarting the process.
服务器运行在 http://127.0.0.1:3000
```
#####2.处理URL请求
开始处理URL模块与Path来识别请求的文件,[url模块](../lesson2)
```js
const http = require('http')
const url = require('url')
const path = require('path');
const hostname = '127.0.0.0.1'
const prot = 3000
const server = http.createServer((req,res)=>{
  if(req.url==='/favicon.ico') return; //不处理ico文件的请求
  let pathname = path.join(__dirname,url.parse(req.url).pathname)
  pathname = decodeURIComponent(pathname);//url解码，防止中文路径出错
  console.log(pathname)
})
server.listen(port,hostname,()=>{
  console.log(`服务器运行在http://${hostname}:${port}`)
})
```
#####3.读取文件并且发送给服务器
```javascript
  if(req.url==='favicon.ico') return
  let pathname = path.join(__dirname,url.parse(req))
  pathname = decodeURIComponent(pathname)
  console.log(pathname)
  /**
   * 判断文件是文件夹师
   * Yes:继续读文件列表
   * No:读取文件内容
   **/
  if(fs.statSync(pathnmae).isDirectory()){
    // 设置个头b吧
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    fs.readdir(pathname,(err,files)=>{
      res.write('<ul>')
      files.forEach((item)=>{
        //path处理
        let link = path.join(url.parse(req.url).pathname,item)
        res.write(`<li><a href="${link}">${item}</a></li>`)
      })
    })
  }
```
先用fs.statSync(pathname).isDirectory()来判断是否为文件夹，是则给浏览器返回当前文件夹下的文件列表，请求/直返回：

####4.文件处理
由于我们的服务器同事要存放html,css,js,png,gif,jpg等文件，并非每个文件的MIME的类型都是text/html的所以需要引入[mime](https://github.com/broofa/node-mime)模块,来处理mime支持.
```javascript
const mime = require('mime');
mime.getType('/path/to/file.txt'); //=> 'text/plain'
mime.getType('file.txt') //=> 'text/plain'
mime.getType('.TXT') //=> 'text/plain'
mime.getType('htm') //=> 'text/html'
```
读取方法
```javascript
else{
  // 以binary读取文件
  fs.readFile(pathname,'binary',(err,data)=>{
    if(err){
      res.writeHead(500,{'Content-Type':'text/plain'})
      res.end(JSON.string(err))
      return false
    }
    res.writeHead(200,{
      'Content-Type':`${mime.getType(pathname)}:charset:UTF-8`
    })
    res.write(data,'binary')
    res.end()
  })
}
```
如果路径不是文件夹，就读取具体的文件，这儿我们以二进制(binary)编码读取，你也可以试试UTF-8比较他们的区别。

到此我们这个Node静态文件服务器就算搭建完成👏，当然了还有许多优化的地方如：缓存、Gzip、页面美化等等

### 小结：

这一节我们了解了**fs模块**，**path模块**。并运用这些知识搭建一**简单的文件服务器**