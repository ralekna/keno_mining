module.exports.jsonFromPipe = function jsonFromPipe(callback, scope, params) {

  var data = '';

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', function(chunk) {
    data += chunk;
  });

  process.stdin.on('end', function() {
    callback.apply(scope, [JSON.parse(data)].concat(params));
  });

};