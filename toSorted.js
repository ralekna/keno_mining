#!/usr/bin/env node

var data = '';
 
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
 
  process.stdin.on('data', function(chunk) {
    data += chunk;
  });
 
  process.stdin.on('end', function() {
    sortJSON(data)
  });

function sortJSON(data) {

	var obj = JSON.parse(data);

	var result = Object.keys(obj).sort().map(function(item) { return obj[item];});

	console.log(JSON.stringify(result));

}
