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
/**
 *=目录遍历
 *
 * @param {*} dir
 * @param {*} callback
 * @param {*} finish
 */
function travel(dir,callback,finish){
  fs.readdir(dir,function(err,files){
    (function next(i){
      if(i<files.length){
        let pathname = path.join(dir,files[i])

        fs.stat(pathname,function(err,stats){
          if(stat.isDirectory){
            travel(pathname,callback,function(){
              next(i+1)
            })
          }else{
            callback(pathname)
            next(i+1)
          }
        })
      }
    }(0))
  })
}