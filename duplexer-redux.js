var duplexer2 = require("duplexer2");
var through = require('through2').obj;


module.exports = function (counter) {
  var countryCounter = {};

  function readCount(countryObj, _, next) {
    var country = countryObj.country;
    var count = countryCounter[country] || 0;
    countryCounter[country] = count + 1;
    next();
  };

  function writeCount(done) {
    counter.setCounts(countryCounter);
    countryCounter = {};
    done();
  }

  return duplexer2({objectMode:true}, through(readCount, writeCount), counter)
};
