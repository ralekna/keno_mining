var cliArgs = require("command-line-args");

var cli = cliArgs([
  { name: "verbose", type: Boolean, alias: "v", description: "Write plenty output" },
  { name: "help", type: Boolean, description: "Print usage instructions" },
  { name: "seq", type: String, defaultOption:"sorted-numbers.json", description: "Generate lucky sequences"},
  { name: "stats", type: String, defaultOption:"lucky-numbers.json", description: "Generate win statistics" },
  { name: "min", type: Number, defaultOption: 1, description: "Minimum or target number" },
  { name: "max", type: Number, defaultOption: NaN, description: "Maximum number. If not provided, single (min) number sequence is generated" },
  { name: "all", type: Boolean, defaultOption: false, description: "Generate lucky numbers from 1 to 60"}
]);

/* generate a usage guide */
var usage = cli.getUsage({
  header: "Lucky sequence generator and tester"
});

/* parse the supplied command-line values */
var options = cli.parse();

if (options.help) {
  console.log(usage);
  return;
}

console.log(options);