#!/usr/bin/env node

var sorter        = require("./sorter.js");
var json_importer = require("./json_importer");
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
  console.log( sorter.keyValuesToArray(json_importer.jsonFromFileSync(filePath)));
  return;
}

// generate lucky sequences
if (options.seq) {
  var filePath = options._[0];
  if (isNaN(options.max)) {
    options.max = options.min
  }

  var sortedSequences = json_importer.jsonFromFileSync(filePath);

  if (options.human) {
    console.log(
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
  } else {
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
  var gamesData = json_importer.jsonFromFileSync(gamesDataFile);
  var sequencesData = json_importer.jsonFromFileSync(options._[1]);
  stats.getWiningStats( gamesData, sequencesData, options.plays, options.plays_offset, options.sequence_length, options.offset );
  return;
}

if (options.pins) {
  var gamesDataFile = options._[0];
  var gamesData = json_importer.jsonFromFileSync(gamesDataFile);

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
