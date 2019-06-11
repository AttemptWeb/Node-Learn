// const express = require('express');
// const routers = require('./routers');
// const path = require('path')
// const app = new express();

// // // get请求
// // app.get('/',(req,res)=>{
// //   res.end('Hello world')
// // })
// //设置存放模板文件目录
// app.set('views',path.join(__dirname,'views')) 
// app.set('view engine','ejs')

// app.use(routers)


// app.listen(3000)
// ------------------
const path = require('path');
const express = require('express');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const routers = require('./routers')
const config = require('config-lite')(__dirname)
const pkg = require('./package')

const app  = express();

app.set('views',path.join(__dirname,'views'))
app.set('viwe engine','ejs')

//设置静态文件的目录
app.use(express.static(path.join(__dirname,'public')))

app.use(session({
  name:config.session.key,
  secret:config.session.secret,
  resave:true,
  saveUninitialized:false,
  cookie:{
    maxAge:config.session.maxAge
  },
  store:new MongoStore({
    url:config.mongodb
  })
}))

app.use(flash())
routers(app)
app.listen(config.port,function(){
  console.log(`${pkg.name} listing on port ${config.port}`)
})