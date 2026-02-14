const fs = require('node:fs');

const input = '/Users/tim/Documents/dev/advent-of-code/nodejs/src/y2025/d06/input.txt'
const sampleInput = '/Users/tim/Documents/dev/advent-of-code/nodejs/src/y2025/d06/sample-input.txt'

let data;

try {
  data = fs.readFileSync(sampleInput, 'utf8');
  // data = fs.readFileSync(input, 'utf8');
} catch (err) {
  console.error('Error reading the file: ' + err);
}

// --------------------------------
// Part 1

// console.log(data);

let lines = data.split("\n");


let rawData = lines.map((l) => l.split(" "))
                   .map((array) => array.filter((item) => item.length > 0));

let args = rawData.slice(0,rawData.length-1);
let ops = rawData[rawData.length-1];

// console.log('////////////////////');


// console.log(ops);
// console.log(args);


function plus(arguments) {
  let total = arguments[0];
  for(let i=1; i<arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

function multiply(arguments) {
  let total = arguments[0];
  for(let i=1; i<arguments.length; i++) {
    total *= arguments[i];
  }
  return total;
}

function opToFn(op) {
  switch (op) {
    case '+': return plus;
    case '*': return multiply;
    default: return plus;
  }
}

function getArgs(index, arguments) {
  let args = [];
  for (let i=0; i<arguments.length; i++) {
    args.push(Number(arguments[i][index]));
  }
  return args;
}


let runningTotal = 0;

// console.log('/////////////////');

for (let i=0; i<ops.length; i++) {

  let op = ops[i];
  let opFn = opToFn(op);
  let arguments = getArgs(i, args);

  let opResult = opFn(arguments);

  // console.log(op);
  // console.log(arguments);
  // console.log(opResult);

  // console.log('/////////////////');

  runningTotal += opResult;
}

console.log('Part 1: ' + runningTotal);


// --------------------------------
// Part 2

let rawData2 = lines.slice(0,lines.length-1);

let ops2 = lines[lines.length-1]
             .split(" ")
             .filter((item) => item.length > 0);

// console.log(rawData2);
// console.log(ops2);

// TODO: need to parse the rawData2 into the proper numbers, then do the operations












