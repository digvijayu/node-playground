const net = require('net');

const server = net.createServer()

server.on('connection', socket => {
  console.log('client connected');
  socket.write('hi there from the server');

  socket.on('close', (hadError) => {
    console.log('closed the connection')
  })

  socket.on('data', data => {
    console.log(`on data ${data}`);
    socket.write(`response for ${data}`)
  })
})

server.listen(8000)

// to connect to this server run
// $ nc localhost 8000
