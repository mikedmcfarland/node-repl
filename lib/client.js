'use strict';
const net = require('net')
const JsonSocket = require('json-socket')
const ReplClient = require('./ReplClient')
const debug = require('debug')('repl')

const argv = require('minimist')(process.argv.slice(2))

const host = argv.h || '127.0.0.1'
const port = argv.p || 5000

const socket = new JsonSocket(new net.Socket())
socket.connect(port,host)
socket.on('connect', () => {
  console.log('client connected')

  const outgoing = {request:'hello server'}
  socket.sendMessage(outgoing)

  socket.on('message', incoming => {
    debug('message recieved',incoming)
    if(!incoming.error){
      const replClient = new ReplClient({host,port:incoming.port})
    }else{
      console.error(incoming.error)
    }
  })
})
