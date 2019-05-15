const fs = require('fs')
const path = require('path')
// 进行递归来进行目录遍历
function travelSync(dir,callback){
  fs.readFileSync(dir).forEach(function(file){
    var pathname = path.join(dir,file)
    if(fs.statSync(pathname).isDirectory){
      travelSync(dir,callback)
    }else{
      callback(pathname)
    }
  })
}
module.exports = travelSync