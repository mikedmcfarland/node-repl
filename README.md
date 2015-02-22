#REPL Jack

Utility for connecting to a remote node application utilizing one or more node js REPLs.

Essentially you run a Jack server, giving it a context for your REPLs. Then any client connecting to the jack will be given its own node js REPL. This allows you to run a node js application on a remote server, run this Jack alongside it, and have multiple REPLs jack into the running applicatio.

# installation

You can use npm to install : `npm install repl-jack`

# Running a jack

## Command Line
A command line script, jack-make is included that can host the jack and create a context.
Here's an example:
```sh

# make a jack, and run FooModule and insert it into the REPL context
jack-make -c FooModule

```

To see its usage use --help
```

$ jack-make --help                                                                                                                                                            1 ↵

Usage: run-jack-make [options]

Options:
   -s, --start     starting port, this is the port that clients will need to use to connect  [9001]
   -e, --end       ending port, the server will utilize the range of ports from start to end for handshaking and REPLs  [9006]
   -c, --context   comma seperated list of modules to require and add to the context  []

```
## Node API

Here's the node jS API

```javascript

var FooModule = require('FooModule');
var Jack = require('repl-jack');

var jack = new Jack({
  context : { FooModule : FooModule},
  ports : [9001,9002,9003]
});

```

# Connecting to a jack

A command line script, jack-connect, is included that can connect to the REPL jack.
Example:
```sh

#connect to a jack at 172.16.254.1 running on port 9001
jack-connect -h 172.16.254.1 -p 9001

```

To its usage use --help

```
$ run-jack-connect --help

Usage: jack-connect [options]

Options:
   -h, --host
   -p, --port   the port of the jack to connect to (should be the start port)  [9001]

```


# Development
This is written in es6. There are a few build tasks that utilize gulp that allow you to test and run the applications in node.
`gulp run-jack-connect' and 'gulp run-jack-make' should get you started when making changes.
