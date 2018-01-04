var split = require('split');
var through = require('through2');

var i = 1;

process.stdin
  .pipe(split())
  .pipe(through(function (line, _, next) {
    if ( i % 2 === 0) {
      this.push(line.toString().toUpperCase())
    } else {
      this.push(line.toString().toLowerCase())
    }
    this.push('\n');
    i++;
    next();
  }))
  .pipe(process.stdout)