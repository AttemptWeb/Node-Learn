##Node中的Stream(流)
> 流（stream）在 Node.js 中是处理流数据的抽象接口（abstract interface）。 `stream` 模块提供了基础的 API 。使用这些 API 可以很容易地来构建实现流接口的对象。
>
> Node.js 提供了多种流对象。 例如， [HTTP 请求](http://nodejs.cn/api/http.html#http_class_http_incomingmessage) 和 [`process.stdout`](http://nodejs.cn/api/process.html#process_process_stdout) 就都是流的实例。流可以是可读的、可写的，或是可读写的。所有的流都是 [`EventEmitter`](http://nodejs.cn/api/events.html#events_class_eventemitter) *(Node事件机制将在后续讲解，可以先自行了解)*的实例。

*尽管所有的 Node.js 用户都应该理解流的工作方式，这点很重要， 但是 `stream` 模块本身只对于那些需要创建新的流的实例的开发者最有用处。 对于主要是消费流的开发者来说，他们很少（如果有的话）需要直接使用 `stream` 模块。*

####1.Node Stream(流)
> 数据流（stream）是处理系统缓存的一种方式。操作系统采用数据块（chunk）的方式读取数据，每收到一次数据，就存入缓存。Node应用程序有两种缓存的处理方式，第一种是等到所有数据接收完毕，一次性从缓存读取，这就是传统的读取文件的方式*(遇上大文件很容易使**内存爆仓**)*；第二种是采用“数据流”的方式，收到一块数据，就读取一块，即在数据还没有接收完成时，就开始处理它*(像流水一样)*

####Node.js 中有四种基本的流类型：

- [Readable](http://nodejs.cn/api/stream.html#stream_class_stream_readable) - 可读的流 (例如 [`fs.createReadStream()`](http://nodejs.cn/api/fs.html#fs_fs_createreadstream_path_options)).
- [Writable](http://nodejs.cn/api/stream.html#stream_class_stream_writable) - 可写的流 (例如 [`fs.createWriteStream()`](http://nodejs.cn/api/fs.html#fs_fs_createwritestream_path_options)).
- [Duplex](http://nodejs.cn/api/stream.html#stream_class_stream_duplex) - 可读写的流 (例如 [`net.Socket`](http://nodejs.cn/api/net.html#net_class_net_socket)).
- [Transform](http://nodejs.cn/api/stream.html#stream_class_stream_transform) - 在读写过程中可以修改和变换数据的 Duplex 流 (例如 [`zlib.createDeflate()`](http://nodejs.cn/api/zlib.html#zlib_zlib_createdeflate_options)).

####所有的 Stream 对象都是 EventEmitter 的实例
常用的事件有：
- `data` - 当有数据可读时触发。
- `end` - 没有更多的数据可读时触发。
- `error` - 在接收和写入过程中发生错误时触发。
- `finish` - 所有数据已被写入到底层系统时触发。

#### 可读流（Readable streams）

> 可读流（Readable streams）是对提供数据的 源头 （source）的抽象

**可读数据流有两种状态：流动状态和暂停状态**。处于流动状态时，数据会尽快地从数据源导向用户的程序(就像流水一样)；处于暂停态时，必须显式调用`stream.read()`等指令，“可读数据流”才会释放数据，(就像流水的闸门，打开它水才继续流下去)

**可读流在创建时都是暂停模式**，暂停模式和流动模式可以互相转换。

要从暂停模式切换到流动模式，有下面三种办法：

- 给“data”事件关联了一个处理器
- 显式调用`resume()`

- 调用`pipe()`方法将数据送往一个可写数据流

要从流动模式切换到暂停模式，有两种途径：

- 如果这个可读的流没有桥接可写流组成管道，直接调用`pause()`
- 如果这个可读的流与若干可写流组成了管道，需要移除与“data”事件关联的所有处理器，并且调用`unpipe()` 方法断开所有管道



#### 可读流常用事件：

- `readable`：在数据块可以从流中读取的时候发出。它对应的处理器没有参数，可以在处理器里调用`read([size])`方法读取数据。
- `data`：有数据可读时发出。它对应的处理器有一个参数，代表数据。如果你只想快快地读取一个流的数据，给data关联一个处理器是最方便的办法。处理器的参数是Buffer对象，如果你调用了Readable的`setEncoding(encoding)`方法，处理器的参数就是String对象。
- `end`：当数据被读完时发出。对应的处理器没有参数。
- `close`：当底层的资源，如文件，已关闭时发出。不是所有的Readable流都会发出这个事件。对应的处理器没有参数。
- `error`：当在接收数据中出现错误时发出。对应的处理器参数是[Error](https://nodejs.org/api/errors.html#errors_class_error)的实例，它的message属性描述了错误原因，stack属性保存了发生错误时的堆栈信息。