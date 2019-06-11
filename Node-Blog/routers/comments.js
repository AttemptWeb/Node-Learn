const express = require('express');
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin

router.post('/',checkLogin,function(req,res,next){
  res.send('创建留言')
})

router.get('/:commentId/remove',checkLogin,function(req,res,next){
  res.send('删除留言')
})

module.exports = router