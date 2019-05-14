const Router = require('express').Router();
Router.get('/:name',(req,res)=>{
  // res.send('hello routers index11'+`\t`+JSON.stringify(req.params.name))
  res.render('users',{
    name: req.params.name
  })
})
module.exports = Router