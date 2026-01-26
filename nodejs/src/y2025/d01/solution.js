const fs = require('node:fs');

const input = '/Users/tim/Documents/dev/advent-of-code/nodejs/src/y2025/d01/input.txt'
const sampleInput = '/Users/tim/Documents/dev/advent-of-code/nodejs/src/y2025/d01/sample-input.txt'

var data;

try {
  data = fs.readFileSync(sampleInput, 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}

