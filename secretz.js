
'use strict'

var crypto = require('crypto');
var gunzip = require('zlib').createGunzip();
var through = require('through2');
var tar = require('tar');
var parser = new tar.Parse();


var cipher = process.argv[2]
var passphrase = process.argv[3]
var decrypter = crypto.createDecipher(cipher, passphrase)


parser.on('entry', function (entry) {
  if(entry.type === 'File') {
    var name = entry.path
    var hasher = crypto.createHash('md5')
    entry.pipe(hasher).pipe(through(function write_line(hash_buffer, _, next) {
      var hash = hash_buffer.toString('hex')
      process.stdout.write(hash + ' ' + name + '\n');
      next();
    }));
  }
  return entry.resume();
});


process.stdin
  .pipe(decrypter)
  .pipe(gunzip)
  .pipe(parser)