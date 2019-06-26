import runTests from "./tests.js";
import {
  TIME_FORMAT,
  TIME_DELTA,
  hoursWordsMatrix,
  boundingsWordsMatrix,
  minutesWordsMatrix,
  timeElement,
} from "./consts.js";

const generateWords = (matrix, elementId) => {
  const matrixBlock = document.querySelector(`#words`);
  matrix.forEach( (value, key) => {
    let span = document.createElement('span');
    span.id = `${elementId}-${key}`;
    span.innerHTML = value;
    matrixBlock.appendChild(span);
  })
}

const resetActiveElements = () => {
  const activeElements = document.querySelectorAll('.active');
  activeElements.forEach( (element) => element.classList.toggle('active'));
}

const markCurrentHour = (hour, isLessThenHalf) => {
  hour = !isLessThenHalf ? (hour < 12 ? hour + 1 : 1) : hour;
  const currentHourElement = document.querySelector(`#hours-${hour}`);
  currentHourElement.classList.add("active");
  return currentHourElement.innerText;
}

const markCurrentBinding = (minute, isLessThenHalf) => {
  let currentBoundingElement = "";
  if(minute <= TIME_DELTA || minute + TIME_DELTA >= 60) return;
  if (isLessThenHalf) {
    currentBoundingElement = document.querySelector("#boundings-past");
    currentBoundingElement.classList.add("active");
  } else {
    currentBoundingElement = document.querySelector("#boundings-to");
    currentBoundingElement.classList.add("active");
  }

  return currentBoundingElement.innerText;
}

const markCurrentMinute = (minute, isLessThenHalf) => {
  let currentMinuteElement = "";
  minute = isLessThenHalf ? minute : 60 - minute;
  // round to closest minute
  // 3 and 7 = 5
  // 8 and 12 = 10
  const closestMinute = Math.round(minute / 5) * 5
  switch (closestMinute) {
    case 0:
      currentMinuteElement = document.querySelector(`#hours-oclock`);
      currentMinuteElement.classList.add("active");
      if (!isLessThenHalf) {
        currentMinuteElement = document.querySelector(`#minutes-99`);
        currentMinuteElement.classList.add("active");
      }
      break;
    case 25:
      currentMinuteElement = document.querySelector(`#minutes-20`);
      currentMinuteElement.classList.add("active");
      currentMinuteElement = document.querySelector(`#minutes-5`);
      currentMinuteElement.classList.add("active");
      break;
    default:
      currentMinuteElement = document.querySelector(`#minutes-${closestMinute}`);
      currentMinuteElement.classList.add("active");
  }
  return currentMinuteElement.innerText;
}

const getTimeFromDateString = (date) => {
  let time = date.toLocaleString('en-US', TIME_FORMAT);
  if (time.length === 7) {
    time = `0${time}`;
  }
  let minute = Number(time.slice(3, 5));
  let hour = Number(time.slice(0, 2));
  return { minute, hour };
}

const markCurrentTime = (date) => {
  resetActiveElements();
  const { minute, hour } = getTimeFromDateString(date);
  let isLessThenHalf = minute > 30 + TIME_DELTA ? false : true;
  const currentHour = markCurrentHour(hour, isLessThenHalf);
  const currentBinding = markCurrentBinding(minute, isLessThenHalf);
  const currentMinute = markCurrentMinute(minute, isLessThenHalf);
  return { currentMinute, currentBinding, currentHour };
}

generateWords(minutesWordsMatrix, "minutes");
generateWords(boundingsWordsMatrix, "boundings");
generateWords(hoursWordsMatrix, "hours");
// runTests(markCurrentTime);
markCurrentTime(new Date());

setInterval(() => markCurrentTime(new Date()), 1000*20);

document.addEventListener( 'visibilitychange' , () => {
    if (!document.hidden) {
        markCurrentTime(new Date());
    }
}, false );

const fetchDaylightTime = async (position) => {
  const { latitude, longitude } = position.coords;
  const resultRaw = await
      fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=today`);
  const { results, status } = await resultRaw.json();
  console.log(results, status);
};

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchDaylightTime);
  } else {
    console.warn("Geolocation is not supported by this browser.");
  }
}

getLocation();
