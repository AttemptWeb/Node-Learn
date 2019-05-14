const Router = require('express').Router();
Router.get('/api',(req,res)=>{
  console.log(req)
  res.send('hello routers index')
})
module.exports = Router