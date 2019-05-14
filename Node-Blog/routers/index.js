const Router = require('express').Router();
const home  = require('./home')
const users  = require('./users')

Router.use('/',home)
Router.use('/users',users)

module.exports = Router