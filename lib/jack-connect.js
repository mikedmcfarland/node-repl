'use strict';
/*
 * Command line program which connects to the jack,
 * Listens for the connection info, and then sets up the REPL client
 * with that info.
 */
const net = require('net')
const JsonSocket = require('json-socket')
const ReplClient = require('./ReplClient')
const Jack = require('./Jack')
const debug = require('debug')('repl')
const options = require('nomnom')
  .option('host',{
    abbr:'h',
    type:'string',
    default : '127.0.0.1'
  })
  .option('port',{
    abbr:'p',
    default: Jack.defaultPortStart,
    type:'int',
    help:'the port of the jack to connect to (should be the start port)'
  })
  .parse(process.argv.slice(2))

const host = options.host
const port = options.port

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
