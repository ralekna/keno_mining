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

function getAppearancesForNumber(data, number) {
  return data.filter(function(sequence) {
    return (sequence.indexOf(number) >= 0);
  });
}

function getFrequencyTable(data, number, tableLength) {

  var appearances = getAppearancesForNumber(data, number);

  var frequencyTable = getTemplateArray(tableLength, 0);

  appearances.forEach(function(sequence){
    sequence.forEach(function(numberInSequence) {
      frequencyTable[numberInSequence]++;
    });
  });

  return frequencyTable.concat();
}

function getRawFrequencyTables(data, start, end, plays, playsOffset, tableLength) {
  var tables = [];
  var playsSegment = data.slice(playsOffset, plays);
  for (var number = start; number <= end; number++ ) {
    tables.push( getFrequencyTable(playsSegment, number, tableLength));
  }

  return {
    meta: {
      start       : start,
      end         : end,
      plays       : plays,
      playsOffset : playsOffset
    },
    data: tables
  };
}

function getLuckySequencesForNumbersHuman(data, start, end, plays, playsOffset, sequenceLength, offset, tableLength) {

  var tables = getRawFrequencyTables(data, start, end, plays, playsOffset, tableLength).data;

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

function getWiningStats(gamesData, sequences, plays, playsOffset) {
  var luckySequencesNumber = sequences.length;
  var wager = plays * luckySequencesNumber;
  var winnings = -wager;
  var table = getTemplateArray(11);

  var playedGames = gamesData.slice(playsOffset, playsOffset + plays);

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
  });
}

function sortedNumbersToPins(data, plays, playsOffset) {

  var playedGames = data.slice(playsOffset, playsOffset + plays);

  return playedGames.map(function(game) {
    var table = getTemplateArray(60);
    game.forEach(function(number) {
      table[number] = 1;
    });
    return table;
  });

}

module.exports = {
  // getTopSequenceForNumber             : getTopSequenceForNumber,
  // getAppearancesForNumber             : getAppearancesForNumber,
  // getFrequencyTable                   : getFrequencyTable,
  getLuckySequencesForNumbersHuman    : getLuckySequencesForNumbersHuman,
  getRawFrequencyTables               : getRawFrequencyTables,
  getWiningStats                      : getWiningStats,
  sortedNumbersToPins                 : sortedNumbersToPins,
  rawFrequenceTablesToSequences       : rawFrequenceTablesToSequences
};
