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