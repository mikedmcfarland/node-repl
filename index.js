'use strict';
const net = require('net')
const repl = require('repl')

let connections = 0

net.createServer(Server).listen(5001)

function Server(socket){
  connections++

  repl.start({
    prompt: "repl-test> ",
    input: socket,
    output : socket
  }).on('exit',() => socket.end() )
}
