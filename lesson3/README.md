### Node模块与NPM
我们都知道JavaScript缺陷之一就是模块儿，浏览器环境的js模块划分只能通过src引入使用，然而，我们是幸运的，高速发展的社区总结出了CommonJS这算是最为重要的里程碑，CommonJS制定了解决这些问题的一些基本规范，Node就是这些规范的一种实现，NodeJs自身实现了Require方法作为其引入模块的方法，同时NPM也是基于CommonJS定义的包规范
### Node模块
每个文件就是一个模块，有自己的作用域，在一个文件里面定义的变量、函数、类都是私有的，对其他文件不可见。commonJS这套规范的出现使得用户不必再考虑变量污染，命名空间这些问题。

### 示例代码
``` javascript
const app = (a,b)=>{
  return a+b
}
// add.js
const add = require('./add')
let resulte = add(1,2)
console.log(resulte) //3
```
#### 1.模块儿引用
`require()`这个方法存在一个接受一个模块的标识，以此引入模块
``` javascript
const fs = require('fs')
```
Node 中引入模块经历三步
1.路径分析
2.文件定位
3.编译执行

Node 优先从缓存中加载模块，Node模块可以分为两类：
- Node 提供核心模块
- 用户编写的文件模块

Node 核心模块加载速度仅次于缓存中加载，然后node_modules模块次之，最慢是自定义模块。

#### 2.模块定义
在模块中，上下文提供exports来暴露模块的方法或者变量，它是唯一的出口
``` javascript 
export.add = funciton(){
  // TODO
}
```
在模块中还存在一个module的对象 ，它代表模块自身，exports 是它的属性，为了方便，Node 为每个模块提供一个exports变量指向Module.exports。
相当于每个模块头部
``` 
var expors = module.exports
```
不能直接将export变量指向一个值，因为这样等于切断了 export与module.exports的联系
##### exports和module.exports 区别
exports 仅仅是module.exports的一个地址引用，nodejs只会导出module.exports的指向变了 那就是仅仅是exports不在指向module.exports 于是不会再被导出
- module.export 才是真正的接口。exports只不过是他的一个辅助工具，最终返回调用的是module.export而不是exports。
- 所有的exports收集到的 属性和方法，都赋值给module.exports。当然，有前提，就是module.exports本身不具备任何属性和方法，如果 module.exports 如果，module.exports已经具备一些属性和方法，那么exports收集来的信息将被忽略
- node开发者建议导出对象用module.exports 导出多个方法和变量用exports

### npm 模块管理器
`npm`的出现则是为了在CommonJS的规范基础上，实现解决包的安装卸载，依赖管理，版本管理等问题，npm不需要单独安装，在安装node的时候，会连带一起啊安装npm
- 允许用户从NPM服务器下载别人编写的第三方包到本地使用。
- 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
- 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。

### npm包
一个符合CommonJS 规范的包应该是如下这种结构
- 一个package.json 文件应该存在于包顶级目录下
- 二进制文件应该包含在bin目录下
- JavaScript 代码应该包含在lib目录下
- 文档应该在doc目录下
- 单元测试应该在test目录下

### package.json
- name: 包名，需要在NPM 上是唯一的，小写字母和数字组成的可以包含`-``_``.`但是不能有空格
- description: 包简介，通常显示在一些列表中
- version: 版本号，一个语义化的版本号([http://semver.org/](http://semver.org/)),通常为x.y.z。该版本号十分重要，常常用于一些版本控制的场合
- keywords: 关键字数组。用于npm中的分类搜索
- maintainers: 包维护的数组，数组元素是一个包含name、email、web 三个属性的JSON对象
- contributors: 包贡献者的数组。第一个就是包的作者本人。在开源社区，如果提交的patch被merge进master分支的话，就应当加上这个贡献patch的人。格式包含name和email
- bugs: 一个可以提交bug的url，可以是邮箱可以是github提交issue地址
- repositories :托管源代码的地址数组
- dependencies :当前包需要的依赖。这个属性很重要
还有一些额外的字段，如bin、scripts、engines、devDependencies、author

### npm的使用

行下面的命令，查看各种信息

```bash
# 查看 npm 命令列表
$ npm help

# 查看各个命令的简单用法
$ npm -l

# 查看 npm 的版本
$ npm -v

# 查看 npm 的配置
$ npm config list -l
```

#### npm 命令安装模块

Node模块采用`npm install`命令安装。

每个模块可以“全局安装”，也可以“本地安装”。“全局安装”指的是将一个模块安装到系统目录中，各个项目都可以调用。一般来说，全局安装只适用于工具模块。“本地安装”指的是将一个模块下载到当前项目的`node_modules`子目录，然后只有在项目目录之中，才能调用这个模块。

```bash
# 本地安装
$ npm install <package name>

# 全局安装
$ sudo npm install -global <package name>
$ sudo npm install -g <package name>
```
指定所安装的包的模块儿处于哪一种性质的依赖关系
- -save:模块名将被添加到dependencies 可以简化为参数`-S`
- -save-dev:模块名将被添加到devDependencies 可以简化为 `-D`
```bash
$ npm install <package name> --save
$ npm install <package name> --save-dev
```

#### 卸载模块

我们可以使用以下命令来卸载 Node.js 模块

```bash
$ npm uninstall <package name>
```

#### 更新模块

我们可以使用以下命令来更新 Node.js 模块

```bash
$ npm update <package name>
```

### 创建模块
可以使用一下命令来创建Node.js模块
``` bash 
npm init
```


`npm init`创建模块会在交互命令行帮我们生产package.json文件
```bash
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (node_modules) test                   # 模块名
version: (1.0.0) 
description: Node.js 测试模块                # 描述
entry point: (index.js) 
test command: make test
git repository: https://github.com/test/test.git  # Github 地址
keywords: 
author: 
license: (ISC) 
About to write to ……/node_modules/package.json:      # 生成地址

{
  "name": "test",
  "version": "1.0.0",
  "description": "Node.js 测试模块",
  ……
}


Is this ok? (yes) yes
```
以上的信息，你需要根据你自己的情况输入。默认回车即可。在最后输入 "yes" 后会生成 package.json 文件。


### 模块发布

发布模块前首先要在npm 中注册账户
```bash
npm adduser
Usename: Morgan
Password: 
Email:caomeng666@foxmail.com
```

```bash
npm publish
```

我们的npm包就成功发布了。

*更多请查看npm帮助信息[npm 文档](https://docs.npmjs.com/)*

### 推荐推荐

- [npm 文档](https://docs.npmjs.com/)
- [深入Node.js的模块机制](https://www.jianshu.com/p/206ec4adc364)
