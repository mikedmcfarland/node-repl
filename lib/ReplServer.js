'use strict';
const net = require('net')
const repl = require('repl')
const events = require('events')
const debug = require('debug')('repl')
const _ = require('lodash')

class Server extends events.EventEmitter {
  start(port){
    debug('creating server with port',port)
    const emitEnd = _.once(() => {
      debug('ending repl server')
      this.emit('end')
    })

    this.server = net.createServer(createRepl(
      () => this.started=true,
      () => this.server.close(emitEnd)))

    this.server.listen(port)

    setTimeout(() => {
      if(!this.started){
        debug('repl server timed out')
        this.server.close(emitEnd)
      }
    },5000)
  }
}

function createRepl(onStart,onExit){
  return (socket) => {
    debug('starting repl server')
    onStart()
    repl.start({
      prompt: "repl-test> ",
      input: socket,
      output : socket,
      terminal : true
    }).on('exit', () => {
      socket.end()
      onExit()
    })
  }
}

module.exports = Server
