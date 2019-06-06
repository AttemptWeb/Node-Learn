const http = require('http');
const readline = require('readline');
const cheerio = require('cheerio');

// 实现一个交互命令
const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout,
  prompt:'search>>>'
})

rl.prompt();// 重新提供个可输入的位置

rl.on('lline',(line)=>{
  console.log(`正在搜索${line}`)
  search(line.trim(),()=>{
    rl.prompt()
  })
}).on('close',()=>{
  console.log('再见！')
  process.exit(0)
})

function search(words,callback=null){
  let options = {
    hostname:'http://www.baidu.com',
    port:80,
    path:`/s?wd=${encodeURI(words)}`,
    methods: 'GET'
  }
  const req = http.request(options,(res)=>{
     console.log(`STATUS: ${res.statusCode}`) //返回状态码
        console.log(`HEADERS: ${JSON.stringify(res.headers, null, 4)}`) // 返回头部
    res.setEncoding('utf8') //设置编码格式
    let body = '';
    res.on('data',(chunk)=>{
      body+=chunk
    })
    res.on('end',()=>{
      let $ = cheerio.load(body);
      $('.t a').each(function(i,e){
        console.log($(this).text(), $(this).attr('href'),'\n')
      })
      callback&&callback();
    })
  })
  req.end();
}