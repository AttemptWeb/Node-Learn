
const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req,res)=>{
  res.statusCode = 200
  res.setHeader('Content-Type','text/plain')
  if(req.url!=='/favicon.ico'){
    let out = fs.createWriteStream('./log.txt') //Ctreate Write Stream
    out.write(`请求方法：${req.method}`)
    out.write(`请求url：${req.url}\n`)
    out.write(`请求对象：${JSON.stringify(req.headers,null,4)}\n`)
    out.write(`请求http版本：${JSON.stringify(req.headers,null,4)}\n`)
  }
  res.end('Hello world')
})
server.listen(port,hostname,()=>{
  console.log(`服务器运行在：http://${hostname}:${port}`)
})

// --------
const http = require('http');
const fs = require('fs')
const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req,res)=>{
  res.statusCode = 200;
  res.setHeader('Content-Type','text/plain')
  if(req.url!=='favicon.ico'){
    let out = fs.createWriteStream('./log.txt')
    out.write(`请求方法${req.method}`)
    out.write(`请求Url${req.url}\n`)
    out.write(`请求方法${JSON.stringify(req.headers,null,4)}\n`)
    out.write(`请求http对象${req.httpVersion}\n`)
  }
  res.end("Hello World\n")
})
server.listen(port,hostname,()=>{
  console.log(`服务器运行在https://${hostname}:${port}`)
})
// ----HTTP Json API 服务器--

const http = require('http')
const url = require('url')
const hostname = '127.0.0.1'
const port = 3000

function parsetime(time){
  return {
    hour : time.getHours(),
    minute : time.getGet(),
    second : time.getSeconds()
  }
}
function unixtime(time){
  return {
    unixtime : time.getTime()
  }
}

const server = http.createServer((req,res)=>{
  let parsedUrl = url.parse(req.url,true)
  let time = new Date(parsedUrl.query.iso)
  let result
  if(req.url == '/'){
    result = parsetime(new Date())
  }
  else if(/^\/api\parsetime/.test(req.url)){
    result = parsetime(time)
  }
  else if(/^\/api\/unixtime/.test(req.url)){
    result = parsetime(time)
  }
  if(result){
    res.writeHead(200,{'Content-Type':'application/json'})
    res.end(JSON.stringify(result))
  }else{
    res.writeHead(404)
    res.end()
  }
})
server.listen(port,hostname,()=>{
  console.log(`服务器运行在http://${hostname}:${port}`)
})