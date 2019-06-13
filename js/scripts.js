const TIME_FORMAT = { hour: 'numeric', minute: 'numeric', hour12: true };

const timeElement = document.querySelector("#time");

const numbersToWordsMatrix = {
    0: null,
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
    20: "twenty",
    30: "thirty",
    40: "forty",
    50: "fifty",
    60: "sixty",
};

const numbersToWords = (number) => {
    let minutesWord = "";
    if (number <= 20) {
        minutesWord = number === 15 ?
            "quarter" :
            numbersToWordsMatrix[number];
    } else {
        const minutesDigit = number % 10;
        const minutesTens = number - minutesDigit;
        minutesWord = number === 30 ?
            "half" :
            ` ${numbersToWordsMatrix[minutesTens]} ${numbersToWordsMatrix[minutesDigit]}`
    }
    return minutesWord;
};

const minutesToWords = (minutes) => {
    minutes = +minutes;
    if(!minutes) return null;
    if (minutes <= 30) {
        return `${numbersToWords(minutes)} past`
    } else {
        return `${numbersToWords(60 - minutes)} to`
    }
};

const hoursToWords = (hours) => {
    hours = +hours;
    return numbersToWords(hours);
};

const timeToWords = (hours, minutes, isAM) => {
    if(!(+minutes)) {
        if(hours === "12") {
            return isAM ? "Midnight" : "Midday";
        } else return `${hoursToWords(hours)} O\'clock`;
    } else {
        if(minutes > 30){
            hours = +hours + 1;
        }
        return `${minutesToWords(minutes)} ${hoursToWords(hours)}`
    }
};

const printCurrentTime = (date) => {
    let time = date.toLocaleString('en-US', TIME_FORMAT);
    if (time.length === 7) {
      time = `0${time}`; 
    }
    const minutes = time.slice(3, 5);
    const hours = time.slice(0, 2);
    const isAM = time.slice(6,8) === "AM";
    timeElement.innerHTML = `${timeToWords(hours, minutes, isAM)} ${time.slice(6,8)}`;
};

printCurrentTime(new Date());

setInterval(() => printCurrentTime(new Date()), 1000*60);

document.addEventListener( 'visibilitychange' , () => {
    if (!document.hidden) {
        printCurrentTime(new Date());
    }
}, false );
