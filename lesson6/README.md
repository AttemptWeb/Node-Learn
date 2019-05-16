# Node的readline (逐行读取)
> `readline` 模块提供了一个接口，用于从可读流（如 process.stdin）读取数据，每次读取一行

基本示例：
``` javascript
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('试试呗',(ans)=>{
  console.log(`试试就试试呗${ans}`)
  rl.close()
})
```
在环境内显示的是
```ssh
$node hello.js
试试呗shishi
试试就试试呗shishi
```
可以看出 可以通过`readline`模块和命令行进行交互功能。

##readline基本用法
`readline.Interface`类就是使用`readline.createInterface()`方法构造的，每个实例是使用`readline.createInterface()` 方法进行构造,每个实例都关联个`iunput`可读流和一个`output`可写流，`output`流用于为到达的用户输入打印提示，且从`input流读取`

####创建ReadLine实例
```javascript
readline.createInterface(options)
```

创建一个`readline`的接口实例. 接受一个Object类型参数，可传递以下几个值:

- `input` - 要监听的可读流 (必需)
- `output` - 要写入 readline 的可写流 (必须).
- `completer` - 用于 Tab 自动补全的可选函数。(不常用)
- `terminal` - 如果希望 input 和 output 流像 TTY 一样对待，那么传递参数 true ，并且经由 ANSI/VT100 转码。 默认情况下检查 isTTY 是否在 output 流上实例化。(不常用)

### 方法

- `rl.close()` 关闭接口实例 (Interface instance), 放弃控制输入输出流。”close” 事件会被触发
- `rl.pause()`暂停 readline 的输入流 (input stream), 如果有需要稍后还可以恢复。 
- `rl.prompt([preserveCursor])` 为用户输入准备好readline，将现有的setPrompt选项放到新的一行，让用户有一个新的地方开始输入。将preserveCursor设为true来防止光标位置被重新设定成0。
- `rl.question(query, callback)` 预先提示指定的query，然后用户应答后触发指定的callback。 显示指定的query给用户后，当用户的应答被输入后，就触发了指定的callback
- `rl.resume() `恢复 readline 的输入流 (input stream).
- `rl.setPrompt(prompt)` 用于设置每当 `rl.prompt()` 被调用时要被写入到 `output` 的提示。
- `rl.write(data[, key])  ` 把 `data` 或一个由 `key` 指定的按键序列写入到 `output`


### 事件

- `line`事件 ：在 input 流接受了一个` \n` 时触发，通常在用户敲击回车或者返回时接收。 这是一个监听用户输入的利器。
- `pause`事件： 输入流被暂停就会触发。 同样当输入流未被暂停，但收到 SIGCONT 也会触发。 (详见 SIGTSTP 和 SIGCONT 事件)
- `resume`事件：只要输入流重新启用就会触发
- `close`事件：当 close() 被调用时触发。 当 input流接收到`end`事件时也会被触发. 流接收到表示结束传输的 `<ctrl>-D`，收到表示 SIGINT 的 `<ctrl>-C`，且 readline.Interface 实例上没有注册 SIGINT 事件监听器。 

更多请参考[node中文网](http://nodejs.cn/api/readline.html)