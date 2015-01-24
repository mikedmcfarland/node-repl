'use strict';
/*
 * Command line program which sets up a ConnectServer
 */
const ConnectionServer = require('./ConnectionServer')
const _ = require('lodash')
const argv = require('minimist')(process.argv.slice(2))
const debug = require('debug')('repl')

const portStart = argv.s || ConnectionServer.defaultPortStart
const portEnd   = argv.e || ConnectionServer.defaultPortEnd

const contextPaths = argv._

const context = _(contextPaths)
  .map(path => ( {path , module:require(path)} ))
  .indexBy('path')
  .value()

const options =
  { context, ports : _.range(portStart,portEnd)}

debug('startting connection server with options',options)
new ConnectionServer(options)
