const fs = require('node:fs');
const ld = require('lodash');

const input = '/Users/tim/Documents/dev/advent-of-code/nodejs/src/y2025/d05/input.txt'
const sampleInput = '/Users/tim/Documents/dev/advent-of-code/nodejs/src/y2025/d05/sample-input.txt'

let data;

try {
//  data = fs.readFileSync(sampleInput, 'utf8');
  data = fs.readFileSync(input, 'utf8');
} catch (err) {
  console.error('Error reading the file: ' + err);
}

// --------------------------------
// Part 1

let arrayOfData = data.split("\n");

let indexOfEmpty = arrayOfData.indexOf("");

let freshIDsRaw = arrayOfData.slice(0, indexOfEmpty);
let freshIdRanges = freshIDsRaw.map((s) => s.split("-"))
                               .map(([a,b]) => [BigInt(a), BigInt(b)]);
                          ;

let inventoryIDs = arrayOfData.slice(indexOfEmpty+1, arrayOfData.length);
inventoryIDs = inventoryIDs.map((n) => BigInt(n))
                           .sort((a,b) => a < b);

function isInRange(id, startRange, endRange) {
  return id >= startRange && id <= endRange;
}

let numFreshIds = 0;

for(const id of inventoryIDs) {
  for(const freshRange of freshIdRanges) {
    if (isInRange(id, ...freshRange)) {
      numFreshIds++;
      break;
    }
  }
}

console.log("Part 1: " + numFreshIds);

// --------------------------------
// Part 2

freshIdRanges = freshIdRanges.map(([a,b]) => a < b ? [a,b] : [b,a])

freshIdRanges.sort(([a1,a2],[b1,b2]) => {
  if (a1 < b1) {
    return -1;
  } else if (a1 > b1) {
    return 1;
  } else {
    return 0;
  }
});

//console.log(freshIdRanges);

function isAlreadyInRanges(start, end, ranges) {
  let newStart = start;
  for (const [s,e] of ranges) {
    if (newStart <= e) {
      newStart = e + BigInt(1);
    }
  }
  return newStart;
}

let adjustedRanges = [];

for (const [start,end] of freshIdRanges) {
  newStart = isAlreadyInRanges(start,end,adjustedRanges);
  if (newStart <= end) {
    adjustedRanges.push([newStart, end]);
  }
//  console.log(start + " -> " + (newStart == start ? "(same)" : newStart) + ", " + end + ", Pushed:" + (newStart <= end));
//  console.log(adjustedRanges);

}

//console.log(adjustedRanges);

console.log("Part 2: " +
            adjustedRanges.map(([s,e]) => e-s+BigInt(1))
                          .reduce((total,val) => total+val, BigInt(0)));
