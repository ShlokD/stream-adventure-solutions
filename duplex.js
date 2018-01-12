var spawn = require('child_process').spawn;
var duplexer2 = require("duplexer2");

module.exports = function (cmd, args) {
    var newProc = spawn(cmd, args);
    return duplexer2(newProc.stdin, newProc.stdout);
};