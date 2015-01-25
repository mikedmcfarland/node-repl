'use strict';
/*
 * Command line program which sets up a repl jack
 */
const Jack = require('./Jack')
const _ = require('lodash')
const debug = require('debug')('repl')
const options = require('nomnom')
  .option('start',{
    abbr:'s',
    type:'int',
    default: Jack.defaultPortStart,
    help:'starting port, this is the port that clients ' +
      'will need to use to connect'
  })
  .option('end',{
    abbr:'e',
    default: Jack.defaultPortEnd,
    type:'int',
    help:'ending port, the server will utilize the range of ports from start ' +
      'to end for handshaking and REPLs'
  })
  .option('context',{
    abbr:'c',
    default: [],
    transform: s => s.split(','),
    help : 'comma seperated list of modules to require and add to the context'
  })
  .parse(process.argv.slice(2))

const portStart = options.start
const portEnd   = options.end

const context = _(options.context)
  .map(path => ( {path , module:require(path)} ))
  .indexBy('path')
  .value()

new Jack({ context, ports : _.range(portStart,portEnd)})
