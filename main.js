#!/usr/bin/env node

var sorter        = require("./sorter.js");
var stdin_importer = require("./stdin_importer");
var stats         = require("./stats");

var options = require( "yargs" )
  .command("sort", "Take date-sequences and convert them into array of arrays. Numbers become zero-based!")
  .command("seq", "Generate lucky sequences. Input sorted sequences")
  .command("stats", "Generate win statistics. Input games data and lucky sequences")
  .command("pins", "Generate table with zeros or ones mapped to according indices. Input games data")
  .default("s", 1, "Minimum or target number")
    .alias("s", "start")
  .default("e", 1, "Maximum number. If not provided, single (min) number sequence is generated")
    .alias("e", "end")
  .default("l", 10)
    .alias("l", "sequence_length")
  .default("t", 60)
    .alias("t", "table_length")
  .default("o", 0)
    .alias("o", "offset")
  .default("i", 1)
    .alias("i", "iterate_with_offset")
  .default("d", 0)
    .alias("d", "plays_offset")
  .default("h", false)
    .alias("h", "human")
  .default("p", 30)
    .alias("p", "plays")
  .help("help")
  .argv;

// sort date-values to array
if (options.sort) {
  var filePath = options.sort;
  console.log( sorter.keyValuesToArray(stdin_importer.jsonFromFileSync(filePath)));
  return;
}

// generate lucky sequences
if (options.seq) {
  var filePath = options._[0];
  if (isNaN(options.max)) {
    options.max = options.min
  }

  var sortedSequences = stdin_importer.jsonFromFileSync(filePath);

  var result;

  if (options.human) {

    result = [];

    for(var i = 0; i < options._with_offset; i++) {
      result = result.concat(
        stats.getLuckySequencesForNumbersHuman(
          sortedSequences,
          options.start-1,
          Math.max(options.end-1, options.start-1),
          options.plays,
          options.plays_offset,
          options.sequence_length,
          options.offset,
          options.table_length
        )
      );
    }

    console.log( result );
  } else {

    result = {
      meta: {
        start       : start,
        end         : end,
        plays       : plays,
        playsOffset : playsOffset
      },
      data: tables    };

    for(var i = 0; i < options._with_offset; i++) {
      result = result.concat(

      );
    }

    console.log(
      JSON.stringify(
        stats.getRawFrequencyTables(
          sortedSequences,
          options.start-1,
          Math.max(options.end-1, options.start-1),
          options.plays,
          options.plays_offset,
          options.table_length
        )
      )
    );
  }

  return;
}

// generate win statistics
if (options.stats) {
  var gamesDataFile = options._[0];
  var gamesData = stdin_importer.jsonFromFileSync(gamesDataFile);
  var sequencesData = stdin_importer.jsonFromFileSync(options._[1]);

  var sequences;
  if(sequencesData['meta']) { // if it is frequencies tables
    sequences = stats.rawFrequenceTablesToSequences(sequencesData.data, options.sequence_length, options.offset);
  } else {
    sequences = sequencesData;
  }
  stats.getWiningStats( gamesData, sequences, options.plays, options.plays_offset );
  return;
}

if (options.pins) {
  var gamesDataFile = options._[0];
  var gamesData = stdin_importer.jsonFromFileSync(gamesDataFile);

  var result = stats.sortedNumbersToPins(gamesData, options.plays, options.plays_offset);

  if (options.human) {
    console.log( result.map(
      function(sequence) {
        return sequence.join('').replace(/1/g,'\u25FC').replace(/0/g,'\u25FB');
      }
    ).join('\n') );
  } else {
    console.log( JSON.stringify( result ) );
  }

  return;
}
