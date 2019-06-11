// const Router = require('express').Router();
// const home  = require('./home')
// const users  = require('./users')

// Router.use('/',home)
// Router.use('/users',users)

// module.exports = Router

module.exports = function(app){
  app.get('/',function(req,res){
    res.redirect('/posts')
  })
  app.use('/signup',require('./signup'))
  app.use('/signin',require('./signin'))
  app.use('/signout',require('./signout'))
  app.use('/posts',require('./posts'))
  app.use('/comments',require('./comments'))
}
