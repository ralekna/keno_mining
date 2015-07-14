#!/usr/bin/env node

var json_importer = require('./json_importer.js');
json_importer.jsonFromPipe(keyValuesToArray);


function keyValuesToArray(data) {

	var result = Object.keys(data).sort().map(function(item) { return data[item];});
	console.log(JSON.stringify(result));

}
