#!/usr/bin/env node
var stdin_importer = require('./stdin_importer');

var lines = [];
var line;

const setPattern = /^Set\s\d+:\s(.+)$/;


function randomOrgSetsToSequences(text) {
  var lines = text.trim().split('\n');
  if(lines[lines.length-1].trim() === '') {
    lines.pop();
  }
  return lines.map(function(item) {
    return item
      .match(setPattern)[1]
      .split(', ')
      .map(function(number) {
        return parseInt(number);
      });
  });
}

stdin_importer.textFromPipe(function(text) {
  console.log(JSON.stringify(randomOrgSetsToSequences(text)));
});
