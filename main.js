#!/usr/bin/env node

var cliArgs       = require("command-line-args");
var sorter        = require("./sorter.js");
var json_importer = require("./json_importer");
var stats         = require("./stats");

var options = require( "yargs" )
  .command("sort", "Take date-sequences and convert them into array of arrays. Numbers become zero-based!")
  .command("seq", "Generate lucky sequences. Input sorted sequences")
  .command("stats", "Generate win statistics. Input games data and lucky sequences")
  .default("s", 1, "Minimum or target number")
    .alias("s", "start")
  .default("e", 1, "Maximum number. If not provided, single (min) number sequence is generated")
    .alias("e", "end")
  .default("sl", 10)
    .alias("sl", "sequence_length")
  .default("tl", 60)
    .alias("tl", "table_length")
  .default("o", 0)
    .alias("o", "offset")
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

  // result = stats.getTopSequenceForNumber( sortedSequences, options.min-1, options.plays, options.sequence_length);
  if (options.human) {
    console.log(
      stats.getLuckySequencesForNumbersHuman(
        sortedSequences,
        options.start-1,
        Math.max(options.end-1, options.start-1),
        options.plays,
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
  stats.getWiningStats( gamesData, sequencesData, options.plays, options.sequence_length, options.offset )
  // console.log(  );
  return;
}
