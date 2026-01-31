const fs = require('node:fs');
const ld = require('lodash');

const input = '/Users/tim/Documents/dev/advent-of-code/nodejs/src/y2025/d03/input.txt'
const sampleInput = '/Users/tim/Documents/dev/advent-of-code/nodejs/src/y2025/d03/sample-input.txt'

var data;

try {
//  data = fs.readFileSync(sampleInput, 'utf8');
  data = fs.readFileSync(input, 'utf8');
} catch (err) {
  console.error('Error reading the file: ' + err);
}

// Part 1

function toNumber(s) {
  return Number(s);
}

function toNumbers(numbers) {
  return numbers.map((s) => toNumber(s))
}

function biggestTwoDigitNumber(numbers) {
  // Remove last element
  const lastNumber = numbers.pop();
  const biggest = Math.max(...numbers);

  const indexOfBiggest = numbers.indexOf(biggest);

  const slicedNumbers = numbers.slice(indexOfBiggest+1, numbers.length);
  slicedNumbers.push(lastNumber);
  const nextBiggest = Math.max(...slicedNumbers);

  return Number(biggest + "" + nextBiggest);
}

console.log(
  data.split("\n")
      .map((s) => s.split(""))
      .map(toNumbers)
      .map((numbers) => biggestTwoDigitNumber(numbers))
      .reduce((total, num) => total + num)
  );

// ------------------------------

// Part 2

function biggestDigit(numbers) {
  return Math.max(...numbers);
}

function biggetVoltage(numbers, digits) {
  if (numbers.length < digits) {
    throw new Error("Not enough numbers");
  }

  if (numbers.length == digits) {
    return Number(...numbers);
  }

  const biggestNumbers = [];

  let startIndex = 0;
  let endIndex = numbers.length - digits + 1;

  while (biggestNumbers.length < digits) {

    const numbersToSearch = numbers.slice(startIndex, endIndex);
    const biggest = biggestDigit(numbersToSearch);
    biggestNumbers.push(biggest);

    // Update slice
    const indexOfBiggest = numbersToSearch.indexOf(biggest);

    startIndex = startIndex + indexOfBiggest + 1;
    endIndex++;
  }

  return Number(biggestNumbers.join(""));
}

console.log(
  data.split("\n")
      .map((s) => s.split(""))
      .map(toNumbers)
      .map((numbers) => biggetVoltage(numbers, 12))
      .reduce((total, num) => total + num)
  );
