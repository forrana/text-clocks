const TIME_FORMAT = { hour: 'numeric', minute: 'numeric', hour12: true };
const TIME_DELTA = 2;

const timeElement = document.querySelector("#time");

const minutesWordsMatrix = new Map([
  [ 20, "twenty" ],
  [ 5, "five" ],
  [ 10, "ten" ],
  [ 15, "quarter" ],
  [ 30, "half" ],
  [ 99, "almost" ],
])

const boundingsWordsMatrix = new Map([
  [ "past", "past" ],
  [ "to", "to" ],
])

const hoursWordsMatrix = new Map([
  [ 1, "one" ],
  [ 2, "two" ],
  [ 3, "three" ],
  [ 4, "four" ],
  [ 5, "five" ],
  [ 6, "six" ],
  [ 7, "seven" ],
  [ 8, "eight" ],
  [ 9, "nine" ],
  [ 10, "ten" ],
  [ 11, "eleven" ],
  [ 12, "twelve" ],
  [ "oclock", "o\'Clock" ],
  ])

export { TIME_FORMAT, TIME_DELTA, hoursWordsMatrix, boundingsWordsMatrix, minutesWordsMatrix, timeElement }
