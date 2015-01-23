'use strict';
const net = require('net')
const debug = require('debug')('repl')
class Client {
  constructor(connection){
    debug('created client using',connection)
    var client = net.connect(
      connection,
      () => console.log('connected to server'))

    client.on('end',() => console.log('disconnected from server'))

    process.stdin.setRawMode(true)
    debug('piping process in/out')
    process.stdin.pipe(client)
    client.pipe(process.stdout)
  }
}
module.exports = Client
