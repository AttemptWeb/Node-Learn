const express = require('express');
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin

router.get('/',function(req,res,next){
  res.send('主页')
})

router.post('/create',function(req,res,next){
  res.send('发布文章')
})

router.get('/create',function(req,res,next){
  res.send('文章详情')
})

router.get('/:postId/edit',checkLogin,function(req,res,next){
  res.send('更新文章')
})

router.get('/:postId/remove',checkLogin,function(req,res,next){
  res.send('删除文章')
})

module.exports = router