const fs = require('fs')
const zlib = require('zlib')

fs.createReadStream('./README.md')
.pipe(zlib.createGzip())
.pipe(fs.createWriteStream('README.md.gz'))

//需要使用sudo权限开启才可以