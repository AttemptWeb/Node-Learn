// const request = require('request');

// request.get('/',function(req,res,next){
//   console.log(req,'====')
//   console.log(res,'====')
//   request('https://rate.tmall.com/list_detail_rate.htm?itemId=547788307274&sellerId=1&currentPage=1',(err,response,body)=>{
//     if(!err&&response.statusCode == 200){
//       var data=JSON.parse(body);
//       console.log('101',data)
//       response.render('index', data);
//     }
//   })
// })
// fetch("https://rate.tmall.com/list_detail_rate.htm?itemId=547788307274&sellerId=1&currentPage=1", 
// {
//   "credentials":"include",
//   "headers":{
//     "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
//     "accept-language":"zh-CN,zh;q=0.9,en;q=0.8",
//     "cache-control":"no-cache",
//     "pragma":"no-cache",
//     "upgrade-insecure-requests":"1"
//   },
//   "referrerPolicy":"no-referrer-when-downgrade",
//   "body":null,
//   "method":"GET",
//   "mode":"cors"
// }
//   );

// const fetch = require("node-fetch");
// const HttpsProxyAgent = require('https-proxy-agent');
  
// // let url="https://ip.nf/me.json";
// let url="https://rate.tmall.com/list_detail_rate.htm?itemId=547788307274&sellerId=1&currentPage=1";
// let ip='代理服务的IP';                   
// let port='代理服务的端口';
// fetch(url, { 
//     method: 'GET',
//     // body: null,    
//     redirect: 'follow',  // set to `manual` to extract redirect headers, `error` to reject redirect 
//     timeout: 10000,      //ms 
//     agent: new HttpsProxyAgent("http://" + ip + ":" + port) //<==注意是 `http://`
// }).then(function (res) {
//     console.log("Response Headers ============ ");
//     res.headers.forEach(function(v,i,a) {
//         console.log(i+" : "+v);
//     });
//     return res.text();
// }).then(function (res) {
//     console.log("Response Body ============ ");
//     console.log(res);
// });


// const express = require("express");
// const fetch = require("node-fetch");
// const request = require('request');

// const app = express()
// const host = process.env.HOST || '0.0.0.0'
// const port = process.env.PORT || 3000

// app.set('port', port)

// app.all('*', function (req, res, next) {
//   if (!req.get('Origin')) return next();
//   // use "*" here to accept any origin
//   res.set('Access-Control-Allow-Origin', '*');
//   res.set('Access-Control-Allow-Methods', 'GET');
//   res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
//   // res.set('Access-Control-Allow-Max-Age', 3600);
//   if ('OPTIONS' == req.method) return res.send(200);
//   next();
// });

// app.get('/ShopEvaluate/:type', function (req, res) {
//   // var sreq = request.get(host + req.originalUrl)
//   res.status(200),
//   // res.json({a:123})
//   fetch('https://rate.tmall.com/list_detail_rate.htm?itemId=547788307274&sellerId=1&currentPage=1', { 
//     method: 'GET',
//     // body: null,    
//     redirect: 'follow',  // set to `manual` to extract redirect headers, `error` to reject redirect 
//     timeout: 10000,      //ms 
//     "credentials":"include",
//     "headers":{
//       "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
//       "accept-language":"zh-CN,zh;q=0.9,en;q=0.8",
//       "cache-control":"no-cache",
//       "pragma":"no-cache",
//       "upgrade-insecure-requests":"1"
//     },
//     "referrerPolicy":"no-referrer-when-downgrade",
//     "body":null,
//     "method":"GET",
//     "mode":"cors"
//   }).then(function (res) {
//       console.log("Response Headers ============ ",res);
//       // res.headers.forEach(function(v,i,a) {
//       //     console.log(i+" : "+v);
//       // });
//       return res.text();
//   }).then(function (res) {
//       console.log("Response Body ============ ");
//       console.log(res);
//   });
//   // request('https://rate.tmall.com/list_detail_rate.htm?itemId=547788307274&sellerId=1&currentPage=1',(err,response,body)=>{
//   //   if(!err&&response.statusCode == 200){
//   //     var data=JSON.parse(body);
//   //     console.log('101',data)
//   //     res.json(data)
//   //     // response.render('index', data);?
//   //     // sreq.pipe(res);
//   //     // sreq.on('end', function (error, res) {
//   //     //   console.log('end');
//   //     // });
//   //   }
//   // })
// })
// async function start() {
//   app.listen(port,host);
//   console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
// }

// start()
// var request = require("request");
// var express = require("express");
// var app = express();
// app.get("/index", (req, res) => {
//     request({
//         url: "https://rate.tmall.com/list_detail_rate.htm?itemId=547788307274&sellerId=1&currentPage=1",
//         method: "GET",
//         json: true,
//         // headers: {
//         //     "content-type": "application/json",
//         // },
//         // body: JSON.stringify(req.body)
//     }, function(error, response, body) {
//         if (error) {
//             console.log('-------------------1-----------------');
//             console.log(error);
//             res.send(error);
//             res.end();
//             console.log('------------------------------------');
//         }else{
//             console.log('-----------------2-------------------');
//             console.log(res);
//             console.log('------------------------------------');
//             res.send(JSON.stringify(body));
//             res.end();
//         }
//     }); 

// })

// app.listen(3000);
const request = require('request')
return request({
    url: "https://rate.tmall.com/list_detail_rate.htm?itemId=547788307274&sellerId=1&currentPage=1",
    method: "GET"
}, (err, res, body) => {
    console.log(body)
})