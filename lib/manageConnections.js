'use strict';
const net = require('net')
const JsonSocket = require('json-socket')
const _ = require('lodash')
const ReplServer = require('./ReplServer')
const debug = require('debug')('repl')


const host = '127.0.0.1'
const portStart = 5000
const portMax = 5006
const availablePorts = _.range(portStart,portMax)
const usedPorts = []

function reservePort() {
  const port = availablePorts.shift()
  usedPorts.push(port)
  return port
}

function releasePort(port){
  availablePorts.push(port)
  usedPorts.splice(usedPorts.indexOf(port),1)
}

const server = net.createServer()
const serverPort = reservePort()
console.log('listening on port',serverPort)
server.listen(serverPort)

server.on('connection', socket =>{
  socket = new JsonSocket(socket)
  console.log('client connected')
  socket.on('message', (incoming) => {

    const port = reservePort()
    let outgoing;
    if(port === undefined){
      outgoing = {error:"too many connections"}
    }else{
      const replServer = new ReplServer()
      replServer.start(port)
      replServer.once('end', () => releasePort(port))
      outgoing = {host:host,port:port}
    }
    socket.sendEndMessage(outgoing)
  })

})
