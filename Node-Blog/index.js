const express = require('express');
const routers = require('./routers');
const path = require('path')
const app = new express();

// // get请求
// app.get('/',(req,res)=>{
//   res.end('Hello world')
// })
//设置存放模板文件目录
app.set('views',path.join(__dirname,'views')) 
app.set('view engine','ejs')

app.use(routers)


app.listen(3000)