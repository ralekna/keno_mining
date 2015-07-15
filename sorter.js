function keyValuesToArray(data) {
	return Object.keys(data)
    .sort()
    .reverse()
		.map(function(key) {
			return data[key].split(" ").map(stringToInt);
		});
}

function stringToInt(string) {
  return parseInt(string, 10) - 1;
}

module.exports = {
	keyValuesToArray: keyValuesToArray
};