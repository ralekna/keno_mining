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

function compareRatiosDesc(a, b) {
  return b.r - a.r;
}

function compareNumbersAsc(a, b) {
  return a.n - b.n;
}

function getAppearancesForNumber(data, number, plays) {
  plays = plays || data.length;

  return data.slice(0, plays).filter(function(sequence) {
    return (sequence.indexOf(number) >= 0);
  });

}

function getTopSequenceForNumber(data, number, plays, sequenceLength, offset, sort) {

  plays          = plays          || 30;
  sequenceLength = sequenceLength || 10;
  offset         = offset         || 0;
  sort           = !(sort === false);

  return getFrequencyTable(data, number, plays)
    .map(function(item, index) {
      return {n: index, r: item};
    })
    .sort(compareRatiosDesc)
    .slice(offset, sequenceLength);

}

function getFrequencyTable(data, number, plays, tableLength) {

  var appearances = getAppearancesForNumber(data, number, plays);

  var frequencyTable = getTemplateArray(tableLength, 0);

  appearances.forEach(function(sequence){
    sequence.forEach(function(numberInSequence) {
      frequencyTable[numberInSequence]++;
    });
  });



  return frequencyTable.concat();

}

function getRawFrequencyTables(data, start, end, plays, tableLength) {
  var tables = [];
  for (var number = start; number <= end; number++ ) {
    tables.push( getFrequencyTable(data, number, plays, tableLength) );
  }

  return {
    meta: {
      start : start,
      end   : end,
      plays : plays
    },
    data: tables
  };
}

function getLuckySequencesForNumbersHuman(data, start, end, plays, sequenceLength, offset, tableLength) {

  var tables = getRawFrequencyTables(data, start, end, plays, tableLength).data;

  return tables.map(function(table) {

    return table
      .map(function(item, index) {
        return {n: index, r: item};
      })
      .sort(compareRatiosDesc)
      .slice(offset, sequenceLength)
      .sort(compareNumbersAsc)
      .map(function(number) {
        return (number.n + 1) + ' : ' + number.r;
      });

  });
}

function getWiningStats(gamesData, rawFrequencyTables, plays, sequenceLength, offset) {
  var luckySequencesNumber = rawFrequencyTables.data.length;
  var wager = plays * luckySequencesNumber;
  var winnings = -wager;
  var table = getTemplateArray(11);

  var playedGames = gamesData.slice(0, plays);

  var sequences = rawFrequenceTablesToSequences( rawFrequencyTables.data, sequenceLength, offset );

  playedGames.forEach(function(game) {

    // var sequenceTable = getTemplateArray(11);
    // var sequenceWager = plays;

    sequences.forEach(function(sequence) {

      var lucky = 0;
      game.forEach(function(ball) {
        if (sequence.indexOf(ball) >= 0) {
          lucky++;
        }
      });
      winnings += (winTable[lucky]);
      // sequenceWager += (winTable[lucky] - 1);

      table[lucky]++;
      // sequenceTable[lucky]++;
    });



  });

  console.log('Results: ', table);
  console.log('----- Winnings ----- ');
  console.log('Winnings', winnings, 'wager', wager, 'ratio', (winnings/wager*100).toFixed(2));

}

function rawFrequenceTablesToSequences(rawFrequencyTables, sequenceLength, offset) {
  return rawFrequencyTables.map(function(table) {
    return table.
      map(function(item, index) {
        return {n: index, r: item};
      })
      .sort(compareRatiosDesc)
      .slice(offset, sequenceLength)
      .map(function(item) {
        return item.n;
      });
  })
}

module.exports = {
  // getTopSequenceForNumber             : getTopSequenceForNumber,
  // getAppearancesForNumber             : getAppearancesForNumber,
  // getFrequencyTable                   : getFrequencyTable,
  getLuckySequencesForNumbersHuman    : getLuckySequencesForNumbersHuman,
  getRawFrequencyTables               : getRawFrequencyTables,
  getWiningStats                      : getWiningStats
};