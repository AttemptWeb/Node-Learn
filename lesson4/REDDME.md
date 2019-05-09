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