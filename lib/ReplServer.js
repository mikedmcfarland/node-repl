'use strict';
const net = require('net')
const repl = require('repl')
const events = require('events')
const debug = require('debug')('repl')
const _ = require('lodash')

/*
 * Sets up a node REPL server over a socket.
 * If no connection is made over the timout period,
 * It closes the socket. Emits 'end' when finished
 * (timout occurs, or client disconnects)
 */
class Server extends events.EventEmitter {
  constructor(port,settings){
    debug('creating server with port',port)
    const emitEnd = _.once(() => {
      debug('ending repl server')
      this.emit('end')
    })

    let started = false
    const server = net.createServer(createRepl(
      settings,
      () => started=true,
      () => server.close(emitEnd)))

    server.listen(port)

    setTimeout(() => {
      if(!started){
        debug('repl server timed out')
        server.close(emitEnd)
      }
    },5000)
  }
}

function createRepl(settings,onStart,onExit){
  return (socket) => {
    debug('starting repl server')
    if(settings.prompt === undefined){
      settings.prompt =`${socket.remoteAddress}> `
    }

    onStart()
    const replInstance = repl.start({
      prompt:settings.prompt,
      input: socket,
      output : socket,
      terminal : true,
      useColors : true
    }).on('exit', () => {
      socket.end()
      onExit()
    })

    debug('assigining context',settings.context)
    _.assign(replInstance.context,settings.context)
  }
}

module.exports = Server
