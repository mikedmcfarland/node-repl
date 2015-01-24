'use strict';
const net = require('net')
const JsonSocket = require('json-socket')
const _ = require('lodash')
const ReplServer = require('./ReplServer')
const debug = require('debug')('repl')

function ConnectionServer(options){
  options = options || {}
  const defaults = {
    ports : _.range(5000,5006),
    prompt : '> ',
    context : {}
  }
  const settings = _.defaults(options,defaults)
  const availablePorts = settings.ports.slice(0)
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
    debug('client connected')
    socket = new JsonSocket(socket)
    socket.on('message', (incoming) => {
      const port = reservePort()
      let outgoing;
      if(port === undefined){
        outgoing = {error:"too many connections"}
      }else{
        const replServer = new ReplServer(port,settings)
        replServer.once('end', () => releasePort(port))
        outgoing = { port }
      }
      socket.sendEndMessage(outgoing)
    })

  })
}

module.exports = ConnectionServer
