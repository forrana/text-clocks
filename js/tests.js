const runTests = (markCurrentTime) => {
  let { currentMinute, currentBinding, currentHour } = markCurrentTime(new Date("01.01.01 08:00"));
  console.assert(currentMinute === "O'Clock");
  console.assert(currentBinding === undefined);
  console.assert(currentHour === "Eight");

  ({ currentMinute, currentBinding, currentHour } = markCurrentTime(new Date("01.01.01 00:00")));
  console.assert(currentMinute === "O'Clock");
  console.assert(currentBinding === undefined);
  console.assert(currentHour === "Twelve");

  ({ currentMinute, currentBinding, currentHour } = markCurrentTime(new Date("01.01.01 12:02")));
  console.assert(currentMinute === "O'Clock");
  console.assert(currentBinding === undefined);
  console.assert(currentHour === "Twelve");

  ({ currentMinute, currentBinding, currentHour } = markCurrentTime(new Date("01.01.01 23:58")));
  console.assert(currentMinute === "Almost");
  console.assert(currentBinding === undefined);
  console.assert(currentHour === "Twelve");

  ({ currentMinute, currentBinding, currentHour } = markCurrentTime(new Date("01.01.01 12:03")));
  console.assert(currentMinute === "Five");
  console.assert(currentBinding === "Past");
  console.assert(currentHour === "Twelve");

  ({ currentMinute, currentBinding, currentHour } = markCurrentTime(new Date("01.01.01 12:28")));
  console.assert(currentMinute === "Half");
  console.assert(currentBinding === "Past");
  console.assert(currentHour === "Twelve");

  ({ currentMinute, currentBinding, currentHour } = markCurrentTime(new Date("01.01.01 12:32")));
  console.assert(currentMinute === "Half");
  console.assert(currentBinding === "Past");
  console.assert(currentHour === "Twelve");

  ({ currentMinute, currentBinding, currentHour } = markCurrentTime(new Date("01.01.01 12:45")));
  console.assert(currentMinute === "Quarter");
  console.assert(currentBinding === "To");
  console.assert(currentHour === "One");
}

export default runTests;
