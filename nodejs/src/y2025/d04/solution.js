const fs = require('node:fs');

const input = '/Users/tim/Documents/dev/advent-of-code/nodejs/src/y2025/d04/input.txt'
const sampleInput = '/Users/tim/Documents/dev/advent-of-code/nodejs/src/y2025/d04/sample-input.txt'

var data;

try {
//  data = fs.readFileSync(sampleInput, 'utf8');
  data = fs.readFileSync(input, 'utf8');
} catch (err) {
  console.error('Error reading the file: ' + err);
}

const paperRolls = data.split("\n").map((array) => array.split(""));

const spaceWithRoll = '@';
const emptySpace = '.';

// Part 1

function above(i) {
  return i - 1;
}

function below(i) {
  return i + 1;
}

function left(i) {
  return i - 1;
}

function right(i) {
  return i + 1;
}

function aboveValid(i) {
  return above(i) >= 0;
}

function belowValid(i, length) {
  return below(i) < length;
}

function leftValid(i) {
  return left(i) >= 0;
}

function rightValid(i, length) {
  return right(i) < length;
}

function aboveLeft(v, h, paperRolls) {
    return aboveValid(v) && leftValid(h)
      ? paperRolls[above(v)][left(h)]
      : emptySpace;
}

function aboveMiddle(v, h, paperRolls) {
    return aboveValid(v)
      ? paperRolls[above(v)][h]
      : emptySpace;
}

function aboveRight(v, h, paperRolls) {
    return aboveValid(v) && rightValid(h,paperRolls[above(v)].length)
      ? paperRolls[above(v)][right(h)]
      : emptySpace;
}

function leftMiddle(v, h, paperRolls) {
    return leftValid(h)
      ? paperRolls[v][left(h)]
      : emptySpace;
}

function rightMiddle(v, h, paperRolls) {
    return rightValid(h,paperRolls[v].length)
      ? paperRolls[v][right(h)]
      : emptySpace;
}

function belowLeft(v, h, paperRolls) {
    return belowValid(v,paperRolls.length) && leftValid(h)
      ? paperRolls[below(v)][left(h)]
      : emptySpace;
}

function belowMiddle(v, h, paperRolls) {
    return belowValid(v,paperRolls.length)
      ? paperRolls[below(v)][h]
      : emptySpace;
}

function belowRight(v, h, paperRolls) {
    return belowValid(v,paperRolls.length) && rightValid(h,paperRolls[below(v)].length)
      ? paperRolls[below(v)][right(h)]
      : emptySpace;
}



let accessiblePaperRolls = 0;

for (let v = 0; v < paperRolls.length; v++) {
  for (let h = 0; h < paperRolls[v].length; h++) {
    let surroundings = [ aboveLeft(v,h,paperRolls), aboveMiddle(v,h,paperRolls), aboveRight(v,h,paperRolls),
                        leftMiddle(v,h,paperRolls),                              rightMiddle(v,h,paperRolls),
                         belowLeft(v,h,paperRolls), belowMiddle(v,h,paperRolls), belowRight(v,h,paperRolls)];
    let rolls = surroundings.filter((x) => x == spaceWithRoll).length

    let currentSpot = paperRolls[v][h];

    if (rolls < 4 && currentSpot == spaceWithRoll) {
      accessiblePaperRolls++;
    }

//    console.log("accessible=" + accessiblePaperRolls
//                + " v=" + v
//                + " h=" + h
//                + " rolls=" + rolls
//                + " around=" + surroundings);

  }
}

console.log("Part 1: " + accessiblePaperRolls);


// ------------------------------

// Part 2


function rollsThatCanBeRemoved(paperRolls) {

  let rollsToRemove = [];

  for (let v = 0; v < paperRolls.length; v++) {
    for (let h = 0; h < paperRolls[v].length; h++) {
      let surroundings = [ aboveLeft(v,h,paperRolls), aboveMiddle(v,h,paperRolls), aboveRight(v,h,paperRolls),
                          leftMiddle(v,h,paperRolls),                              rightMiddle(v,h,paperRolls),
                           belowLeft(v,h,paperRolls), belowMiddle(v,h,paperRolls), belowRight(v,h,paperRolls)];
      let rolls = surroundings.filter((x) => x == spaceWithRoll).length

      let currentSpot = paperRolls[v][h];

      if (rolls < 4 && currentSpot == spaceWithRoll) {
        rollsToRemove.push([v,h]);
      }

  //    console.log("accessible=" + rollsToRemove.length
  //                + " v=" + v
  //                + " h=" + h
  //                + " rolls=" + rolls
  //                + " around=" + surroundings);

    }
  }

  return rollsToRemove;
}

function removeRolls(paperRolls, rollsToRemoveThisRound) {
  for(const [v,h] of rollsToRemoveThisRound) {
    paperRolls[v][h] = emptySpace;
  }
  return paperRolls;
}

function howManyRollsCouldBeRemoved(paperRolls) {

  let allRollsRemoved = [];

  let rollsToRemoveThisRound = rollsThatCanBeRemoved(paperRolls);

  while (rollsToRemoveThisRound.length != 0) {
    allRollsRemoved = allRollsRemoved.concat(rollsToRemoveThisRound)
    let newPaperRolls = removeRolls(paperRolls, rollsToRemoveThisRound);
    rollsToRemoveThisRound = rollsThatCanBeRemoved(newPaperRolls);
  }

  return allRollsRemoved.length;
}

console.log("Part 2: " + howManyRollsCouldBeRemoved(paperRolls));
