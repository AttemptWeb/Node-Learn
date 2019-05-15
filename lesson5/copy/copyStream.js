const fs = require('fs');
const out = process.stdout;

let paths = {
  src:'../test/test.txt',
  dist:'../test.out.txt'
}

function copy(paths){
  let {src,dist} = paths
  let readStream = fs.createReadStream(src)
  let writeStream = fs.createWriteStream(dist)
  readStream.pipe(writeStream)

  let stat = fs.statSync(src),
  totalSize = stat.size,
  progress = 0,
  lastSize = 0,
  startTime = Date.now();

  readStream.on('data',function(chunk){
    progress += chunk.length;
  })
  //增加旁观者 计时
  setTimeout(function show(){
    let percent = Math.ceil((progress/totalSize)*100)
    let size = Math.ceil(progress/1000000)
    let diff = size - lastSize
    console.log(diff,'diff')
    lastSize = size
    out.clearLine()
    out.cursorTo(0)
    out.write(`已经完成了${size}MB,${percent}%速度：${diff*2}MB/s`)
    if(progress<totalSize){
      setTimeout(show,500)
    }else{
      let endTime = Date.now()
      console.log(`共用时${(endTime - startTime)/1000}秒`)
    }
  },500)
}

copy(paths)