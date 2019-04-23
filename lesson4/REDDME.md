#  🔨Node入门教程-搭建静态文件服务器
> 通过前面的几篇介绍，我们这个教程算正式打开Node开发的大门，学习了[环境搭建](../lesson1)、然后为了提高各位看官的新趣粗略的介绍了[Http模块](../lesson2)、之后又了解了[Node的模块](../lesson3)。之前说过，**我们将通过实例来学习Node**，从这一篇开始，我们就将用实例来学习各个模块。
> 这一节我们将学习[File System (文件系统)](http://nodejs.cn/api/fs.html)以及[Path(路径)](http://nodejs.cn/api/path.html))并结合之前学习的知识打造 🔨一个Node静态文件服务器

## Node.js文件系统
> Node.js提供本地文件的读写能力，基本类似UNIX(POSIX)的标准文件操作API。所有的方法都有异步和同步，例如读取文件内容的函数有异步的fs.readFile()和同步的fs.readFileSync()。