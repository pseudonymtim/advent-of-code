const fs = require('node:fs');
const ld = require('lodash');

const input = '/Users/tim/Documents/dev/advent-of-code/nodejs/src/y2025/d02/input.txt'
const sampleInput = '/Users/tim/Documents/dev/advent-of-code/nodejs/src/y2025/d02/sample-input.txt'

var data;

try {
  data = fs.readFileSync(input, 'utf8');
} catch (err) {
  console.error('Error reading the file: ' + err);
}

// Part 1

function toArray(str) {
    return str?.split("-")
}

function toRange([start, end]) {
    return ld.range(start, ++end);
}

function isEven(number) {
    return (number % 2) == 0;
}

function repeatedDigits(number) {
    var numStr = number.toString();
    var length = numStr.length;

    return isEven(length)
        && numStr.slice(0, length/2) == numStr.slice(length/2, length);
}

console.log(
    data.split(",")
        .map(toArray)
        .map(toRange)
        .flat(1)
        .filter(repeatedDigits)
        .reduce((accumulator, currentValue) => accumulator + currentValue)
);


// ------------------------

// Part 2

function splitStringInto(numStr, parts) {
    var length = numStr.length;
    var sizeOfEachPart = length / parts;

    var array = [];

    for(let i=0; i<length; i=i+sizeOfEachPart) {
        array = array.concat(numStr.slice(i,i+sizeOfEachPart));
    }

    return array;
}

function repeatedDigits2(number) {
    var numStr = number.toString();
    var length = numStr.length;

    if (length < 2) {
        return false;
    }

    var partitions = ld.range(2, length+1)
                       .filter((n) => length % n == 0);

    for (const part of partitions) {
        if (new Set(splitStringInto(numStr, part)).size == 1) {
            // Made up of repeating parts
            return true;
        }
    }

    // Not made up of repeating parts
    return false;
}

console.log(
    data.split(",")
        .map(toArray)
        .map(toRange)
        .flat(1)
        .filter(repeatedDigits2)
        .reduce((accumulator, currentValue) => accumulator + currentValue)
);


