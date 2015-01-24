'use strict';
const net = require('net')
const debug = require('debug')('repl')

/*
 * Connects to a node REPL over a socket, connecting
 * stdin and stdout to it
 */
function Client(connection) {
  debug('created client using',connection)

  var sock = net.connect(
    connection,
    () => console.log('connected to server'))

  debug('piping process in/out')
  process.stdin.pipe(sock)
  sock.pipe(process.stdout)

  sock.on('connect', () => {
    process.stdin.setRawMode(true)
  })

  function done () {
    sock.destroy()
    console.log('disconnected from server')
  }

  sock.on('end',done)
  sock.on('close', () => {
    process.stdin.setRawMode(false)
    sock.removeListener('close',done)
  })

  process.stdin.on('end',() =>{
    sock.destroy()
    console.log()
  })

}
module.exports = Client
