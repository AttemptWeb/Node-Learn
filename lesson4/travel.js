const fs = require('fs')
const path = require('path')
/**
 *目录遍历
 *
 * @param {*} dir dirName
 * @param {*} callback Fn
 */
function travelSync(dir,callback){
  fs.readdirSync(dir).forEach(function(file){
    var pathname = path.join(dir,file)
    if(fs.statSync(pathname).isDirectory){
      travelSync(pathname,callback)
    }else{
      callback(pathname)
    }
  })
}

function travel(dir,callback,finish){
  fs.readdir(dir,function(err,files){
    
  })
}