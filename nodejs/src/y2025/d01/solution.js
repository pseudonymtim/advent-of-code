const fs = require('node:fs');

const input = '/Users/tim/Documents/dev/advent-of-code/nodejs/src/y2025/d01/input.txt'
const sampleInput = '/Users/tim/Documents/dev/advent-of-code/nodejs/src/y2025/d01/sample-input.txt'

var data;

try {
  data = fs.readFileSync(input, 'utf8');
} catch (err) {
  console.error('Error reading the file: ' + err);
}

function convertDirectionToPlusMinus(str) {
    return str.replace("R", "+").replace("L", "-");
}

const instructions = data?.split('\n').map(convertDirectionToPlusMinus);

console.log(instructions);

var total = 50;
var timesAtZeroP1 = 0;

for (const instruction of instructions) {
    const num = parseInt(instruction);
    total += num;
    if (total % 100 == 0) {
        timesAtZeroP1++;
    }
}


console.log("Part 1: " + timesAtZeroP1);

// End of Part 1
// -----------------------------------
// Part 2

total = 50;
var timesAtZeroP2 = 0;

for (const instruction of instructions) {
    const num = parseInt(instruction);

    // Accounts for more than a full spin in the instruction
    if (num < 0) {
        timesAtZeroP2 += Math.abs(Math.ceil(num / 100));
    } else {
        timesAtZeroP2 += Math.abs(Math.floor(num / 100));
    }

    var tempTotal = total + (num % 100)

    if ( (total % 100 != 0)
         &&
         ( (Math.floor(total / 100) != Math.floor(tempTotal / 100))
           ||
           (tempTotal % 100 == 0)
         )
       ) {
        timesAtZeroP2++;
    }

    total += num;
}

console.log("Part 2: " + timesAtZeroP2);

