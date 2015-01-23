'use strict';
const ReplServer = require('./ReplServer')
const port = 5000
const server = new ReplServer()
server.start(port)
