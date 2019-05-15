const fs = require('fs')
let data = ''
//创建可读的流
let readStream = fs.createReadStream('./test.md')
//设置编码

readStream.setEncoding('UTF8')

readStream.on('data',function(chunk){
  data+=chunk
})

readStream.on('end',function(){
  console.log(data)
})

readStream.on('error',function(err){
  console.log(err.statck)
})
// data end error
console.log('完毕')

let data = 'README'
let writeStream = fs.createWriteStream('test.md')
writeStream.write(data,'UTF8')
writeStream.end()

writeStream.on('finish',function(){
  console.log('Finish')  
})
writeStream('error',function(error){
  console.log(error.statck)
})
console.log('程序完成')
