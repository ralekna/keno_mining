#!/usr/bin/env node

var forNumber = process.argv[2];

var plays = parseInt(process.argv[3] || 0);

var json_importer = require('./json_importer.js');
json_importer.jsonFromPipe(calculateTopForNumber);

var winTable = [
  2,
  0,
  0,
  0,
  0,
  1,
  2,
  8,
  50,
  800,
  10000
];

function getTemplateArray(len) {
  var retVal = [];
  for(var i = 0; i<len; i++) {
    retVal.push(0);
  }
  return retVal;
}

function compareNumbers(a, b) {
  return b.ratio - a.ratio;
}

function getAppearancesForNumber(data, number, plays) {
  plays = plays || data.length;

  return data.slice(-plays).filter(function(item) {
    return (item.indexOf(number) >= 0);
  });

}



function calculateTopForNumber(data) {

  if(plays == 0) {
    plays = data.length;
  }

  var whereAppeared = data.slice(-plays).filter(function(item) {
    return (item.indexOf(forNumber) >= 0);
  });
  console.log('-----------');
  console.log('number: ', forNumber);
  console.log('appeared in: ', whereAppeared.length);

  var table = getTemplateArray(60);

  whereAppeared.forEach(function(sequence){
    sequence.split(' ').forEach(function(number) {
      table[parseInt(number)-1]++;
    });
  });

  var formatted = table.map(function(item, index) {
    return {number: index+1, ratio: item};
  }).sort(compareNumbers).map(function(item){
    return ((item.number <= 9) ? '0' : '') + String(item.number); // + ', ratio: ' + (item.ratio); // - arr[index+1].ratio);
  }).slice(1,11);

  console.log('lucky friend numbers: ');
  console.log(formatted.join('\n'));

  generatedSequenceStats(whereAppeared, [forNumber].concat(formatted));

}

function generatedSequenceStats(data, sequence) {

  var wager = plays;
  var withoutLoss = 0;
  var table = getTemplateArray(11);
  data.forEach(function(item) {
    var lucky = 0;
    item.split(' ').forEach(function(number) {
      if (sequence.indexOf(number) >= 0) {
        lucky++;
      }
    });
    wager += (winTable[lucky] - 1);
    withoutLoss += winTable[lucky];
    table[lucky]++;
  });

  console.log('sequence stats:');
  console.log(table.map(function(item, index) {
    return index + ' : ' + item;
  }).join('\n'));

  console.log('winnings:');
  console.log('wager/plays:' + wager + ' / ' + plays + ' | ' + (wager/plays));
}

function sortJSON(data) {
  var obj = JSON.parse(data);
  var result = Object.keys(obj).sort().map(function(item) { return obj[item];});
  console.log(result);
}

module.exports = {

};