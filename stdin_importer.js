
module.exports.textFromPipe = function textFromPipe(callback, scope, params) {

  var data = '';

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', function(chunk) {
    data += chunk;
  });

  process.stdin.on('end', function() {
    callback.apply(scope, [data].concat(params));
  });

};

module.exports.jsonFromPipe = function jsonFromPipe(callback, scope, params) {
  textFromPipe(function (data) {
    callback.apply(scope, [JSON.parse(data)].concat(params));
  });
};

var fs = require('fs');

module.exports.jsonFromFileSync = function(path, options) {
  return JSON.parse(fs.readFileSync(path, options));
};
