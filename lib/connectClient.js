'use strict';
const net = require('net')
const JsonSocket = require('json-socket')
const ReplClient = require('./ReplClient')

const host = '127.0.0.1'
const port = 5000

var socket = new JsonSocket(new net.Socket())
socket.connect(port,host)
socket.on('connect', () => {
  console.log('client connected')
  const outgoing = {request:'hello server'}
  socket.sendMessage(outgoing)

  socket.on('message', incoming => {
    console.log('message recieved',incoming)
    if(!incoming.error)
      var replClient = new ReplClient(incoming)
    else
      console.error(incoming.error)
  })
})
