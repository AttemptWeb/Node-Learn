####Node操作MongoDB数据库
#####非关系型数据库-NoSQL
在NoSQL之前，数据库中的SQL一枝独秀，伴随web快速的发展，非关系型、分布式数据存储得到快速的发展，访问量巨大，传统关系数据库遇到很多瓶颈（例如高并发的读写操作，高扩展性和可用性，复杂SQL，特别是多表关联查询等）NoSQL数据库的出现，弥补了关系数据（如MySQL）一些方面的不足，在某些方面上极大的节省开发成本和维护成本
#####NoSQL的优势
- 易扩展
- 高性能
- 灵活数据模型
- 高可用

#####NoSQL的分类
NoSQL的分类可以大体上分为四个种类：Key-value、Document-Oriented、Column-Family Databases以及 Graph-Oriented Databases


| 类型                                   | 代表         | 特点                                       |
| ------------------------------------ | ---------- | ---------------------------------------- |
| 键值（Key-Value）                        | MemcacheDB | 键值数据库就像在传统语言中使用的哈希表。你可以通过key来添加、查询或者删除数据，鉴于使用主键访问，所以会获得不错的性能及扩展性。 |
| 面向文档（Document-Oriented）              | MongoDB    | 文档存储一般用类似json的格式存储，存储的内容是文档型的。这样也就有有机会对某些字段建立索引，实现关系数据库的某些功能。 |
| 列存储（Wide Column Store/Column-Family） | Cassandra  | 顾名思义，是按列存储数据的。最大的特点是方便存储结构化和半结构化数据，方便做数据压缩，对针对某一列或者某几列的查询有非常大的IO优势。 |
| 图（Graph-Oriented）                    | Neo4J      | 图形关系的最佳存储。使用传统关系数据库来解决的话性能低下，而且设计使用不方便。  |

####关系型数据库-SQL
SQL指结构化查询语言，全称是 Structured Query Language，关系数据库，是建立在关系模型基础上的数据库，借助于集合代数等数学概念和方法来处理数据库中的数据，关简单来说，关系模型指的就是二维表格模型，而一个关系型数据库就是由二维表及其之间的联系所组成的一个数据组织

####SQL的优点
- 容易理解：二维表的结构是十分贴切逻辑世界的一个概念，关系模型相对网状，层次等其他模型来说更容易理解
- 使用方便：通用的SQL语言使得操作关系型数据库非常方便
- 易于维护：丰富的完整性（实体完整性，参照完整性和用户定义的完整性）大大减低了数据冗余和数据不一致的概率

*SQL遇到的瓶颈，不是说SQL不行，只是应用场景不同*

#### RDBMS数据库程序
RDBMS 指关系型数据库管理系统。RDBMS是SQL的基础，同样也是所有现代数据库的基础。如 MS SQL Server、IBM DB2、Oracle、MySQL 以及 Microsoft Access。RDBMS 中的数据存储在被称为表的数据库对象中。表是相关的数据项的集合，它由列和行组成

####Node操作MongoDB
MongoDB是一个基于分布式文件存储的数据库，由c++语言编写 。旨在为web提供可括号站的高性能的数据存储解决方案。MongoDB是一个介于关系数据库之间的产品，是非常关系数据库当中功能最丰富，最像关系数据库的。
| SQL术语/概念    | MongoDB术语/概念 | 解释/说明                   |
| ----------- | ------------ | ----------------------- |
| database    | database     | 数据库                     |
| table       | collection   | 数据库表/集合                 |
| row         | document     | 数据记录行/文档                |
| column      | field        | 数据字段/域                  |
| index       | index        | 索引                      |
| table joins |              | 表连接,MongoDB不支持          |
| primary key | primary key  | 主键,MongoDB自动将_id字段设置为主键 |

MongoDB和Node.js特别配，因为MongoDB是基于文档的，文档是按BSON（JSON的轻量化二进制格式）存储的，增删改查等管理数据库的命令和JavaScript语法很像，这里我们选择[mongoose](http://mongoosejs.com/)来进行增删改查，mongoose构建在MongoDB之上，提供了Schema、Model和Document对象，用起来很方便

### 1.安装Mongoose
```bash
npm install mongoose
```
#### 2.使用Mongoose进行crud
连接数据库
```javascript
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const db = mongoose.connect('mongodb://localhost/test')
db.connection.on('error',function(error){
  console.log('数据库连接失败：'+error)
})
db.connection.on('open',function(error){
  console.log('连接成功')
})
```

##### Mongoose几个名词
- `Schema` : 一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
- `Model` : 由`Schema` 发布生成的模型，具有抽象属性和行为的数据库操作对
- `Entity` : 由`Model` 创造的实体，他的操作也会影响数据库

**`Schema`生成`Model`，`Model`创造`Entity`，`Model`和`Entity`都可对数据库操作造成影响，但`Model`比`Entity`更具操作性**

**Schema**

schema是mongoose里会用到的一种数据模式，可以理解为表结构的定义；每个schema会映射到mongodb中的一个collection，它不具备操作数据库的能力
```javascript
const kittySchema = mongoose.schema({
  name:String
})
```
