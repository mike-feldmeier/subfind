#! /usr/bin/env node

var readline = require('readline');
var fs = require('fs');
var pathutils = require('pathutils');

if(module.parent) {
  module.exports = subfind;
}
else {
  if(process.argv.length == 2) {
    console.log('Usage: subfind <string>');
    process.exit(0);
  }

  subfind(process.argv.slice(2));
}

function subfind(args) {
  pathutils.walkFiles(__dirname, function(err, file) {
    if(err) throw err;
    var count = 0;

    var rl = readline.createInterface({
      input: fs.createReadStream(file)
    });

    console.log(file);

    rl.on('line', function(line) {
      ++count;
      args.forEach(function(arg) {
        if(line.indexOf(arg) > -1) {
          console.log('%d: %s', count, line);
        }
      });
    });
  });
}
