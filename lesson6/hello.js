const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
})

rl.question('试试呗',(ans)=>{
  console.log(`试试就试试呗${ans}`)
  rl.close()
})