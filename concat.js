var concat = require('concat-stream');

function reverseStream(str) {
   process.stdout.write(str.reverse());
}

process.stdin.pipe(concat(reverseStream))
