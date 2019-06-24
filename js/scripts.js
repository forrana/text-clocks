const TIME_FORMAT = { hour: 'numeric', minute: 'numeric', hour12: true };

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
  [ "oclock", "O\'Clock" ],
  ])

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
}

const markCurrentBinding = (minute, isLessThenHalf) => {
  if(!isLessThenHalf && minute < 57) {
    const currentBoundingElement = document.querySelector(`#boundings-to`);
    currentBoundingElement.classList.add("active");
  } else if(minute > 3 && minute < 57) {
    const currentBoundingElement = document.querySelector(`#boundings-past`);
    currentBoundingElement.classList.add("active");
  }
}

const markCurrentMinute = (minute, isLessThenHalf) => {
  let currentMinuteElement = "";
  minute = isLessThenHalf ? minute : 60 - minute;
  console.log(minute, isLessThenHalf)
  switch (true) {
    case minute > 0 && minute <= 3:
      currentMinuteElement = document.querySelector(`#hours-oclock`);
      currentMinuteElement.classList.add("active");
      if (!isLessThenHalf) {
        currentMinuteElement = document.querySelector(`#minutes-99`);
        currentMinuteElement.classList.add("active");
      }
      break;
    case minute > 3 && minute <= 7:
      currentMinuteElement = document.querySelector(`#minutes-5`);
      currentMinuteElement.classList.add("active");
      break;
    case minute > 7 && minute <= 12:
      currentMinuteElement = document.querySelector(`#minutes-10`);
      currentMinuteElement.classList.add("active");
      break;
    case minute > 12 && minute <= 17:
      currentMinuteElement = document.querySelector(`#minutes-15`);
      currentMinuteElement.classList.add("active");
      break;
    case minute > 17 && minute <= 22:
      currentMinuteElement = document.querySelector(`#minutes-20`);
      currentMinuteElement.classList.add("active");
      break;
    case minute > 22 && minute <= 27:
      currentMinuteElement = document.querySelector(`#minutes-20`);
      currentMinuteElement.classList.add("active");

      currentMinuteElement = document.querySelector(`#minutes-5`);
      currentMinuteElement.classList.add("active");
      break;
    case minute > 27 && minute <= 32:
      currentMinuteElement = document.querySelector(`#minutes-30`);
      currentMinuteElement.classList.add("active");
      break;
  }
}

const markCurrentTime = (date) => {
  resetActiveElements();
  let time = date.toLocaleString('en-US', TIME_FORMAT);
  if (time.length === 7) {
    time = `0${time}`;
  }
  let minute = Number(time.slice(3, 5));
  let hour = Number(time.slice(0, 2));
  let isLessThenHalf = minute > 32 ? false : true;
  markCurrentHour(hour, isLessThenHalf);
  markCurrentBinding(minute, isLessThenHalf);
  markCurrentMinute(minute, isLessThenHalf);
}

generateWords(minutesWordsMatrix, "minutes");
generateWords(boundingsWordsMatrix, "boundings");
generateWords(hoursWordsMatrix, "hours");
markCurrentTime(new Date())

setInterval(() => markCurrentTime(new Date()), 1000*20);

document.addEventListener( 'visibilitychange' , () => {
    if (!document.hidden) {
        markCurrentTime(new Date());
    }
}, false );
