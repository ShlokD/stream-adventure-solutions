var trumpet = require('trumpet');
var through = require('through2');


var tr = trumpet();

function write(buf, _, next) {
  this.push(buf.toString().toUpperCase());
  next();
}

function end(done) {
  done();
}

var stream = tr.select('.loud').createStream();
stream.pipe(through(write, end)).pipe(stream);
process.stdin.pipe(tr).pipe(process.stdout);

