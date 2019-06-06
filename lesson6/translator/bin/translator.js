const program = require('program');
const Table = require('cli-table2') // 表格输出
const superagent = require('superagent')

program
  .allowUnknownOption()
  .version('1.0.0')
  .usage('translator<cmd>[input]')

const API = 'http://fanyi.youdao.com/openapi.do?keyfrom=toaijf&key=868480929&type=data&doctype=json&version=1.1'

program
  .command('query')
  .description('翻译输入')
  .action(function(word){
    superagent.get(API)
    .query({p:word})
    .end(function(err,res){
      if(err){
        console.log('excuse me ,try again')
        return false;
      }
      let data = JSON.parse(res.text)
      let result = {}
      if(data.basic){
        console.log(data.basic,'data.basic')
        result[word] = data['basic']['explains']
      }else if(data.translation){
          result[word] = data['translation']
      }else {
          console.error('error')
      }
      let table = new Table()
      table.push(result)
      console.log(table.toString())
    })
  })

  if(!process.argv[2]){
    program.help();
    console.log();
  }
  program.parse(process.argv)