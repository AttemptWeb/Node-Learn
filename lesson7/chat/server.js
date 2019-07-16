const net = require('net');
const server = net.createServer();
let sockets = [];
server.on('connection',function(sockets){
  console.log('new Contention')
  sockets.push(socket)
  socket.on('data', function(data) {
    console.log('Got data: ', data)
    sockets.forEach(function(otherSocket) {
        if (otherSocket !== socket) {
            otherSocket.write(data)
        }
    })
  })
  socket.on('close', function() {
      console.log('A client connection closed')
      let index = sockets.indexOf(socket)
      sockets.splice(index, 1)
  })

})
server.on('error', function(err) {
  console.log('Server error: ', err.message)
})
server.on('close', function() {
  console.log('Server closed')
})
server.listen(8080)