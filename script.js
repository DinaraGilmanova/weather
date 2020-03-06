const currentData = [
  {
    date: 1564488000000,
    temperature: {
      night: 16,
      day: 26
    },
    cloudiness: "Ясно",
    snow: false,
    rain: true
  },
  {
    date: 1564574400000,
    temperature: {
      night: 19,
      day: 29
    },
    cloudiness: "Облачно",
    snow: false,
    rain: false
  },
  {
    date: 1564660800000,
    temperature: {
      night: 12,
      day: 21
    },
    cloudiness: "Облачно",
    snow: false,
    rain: true
  },
  {
    date: 1564747200000,
    temperature: {
      night: 16,
      day: 26
    },
    cloudiness: "Ясно",
    snow: false,
    rain: false
  },
  {
    date: 1564833600000,
    temperature: {
      night: 16,
      day: 26
    },
    cloudiness: "Ясно",
    snow: false,
    rain: false
  },
  {
    date: 1564920000000,
    temperature: {
      night: 16,
      day: 26
    },
    cloudiness: "Ясно",
    snow: false,
    rain: false
  }
];
const d = new Date(1564488000000);
d.setHours(16, 0, 0, 0);
const n = d.getTime();
let arry = [];
for (let i = 0; i < currentData.length; i++) {
  if (n === currentData[i].date) {
    let currentDay = currentData[i].date;
    var nextDay = currentDay;
    for (k = 1; k < 4; k++) {
      nextDay += 24 * 60 * 60 * 1000;
      if (
        currentData[i + k] !== undefined &&
        currentData[i + k].date === nextDay
      ) {
        arry = [currentData[i + k].date];

        arry +=
          "," +
          [currentData[i].date] +
          "," +
          [currentData[i + k].date] +
          "," +
          [nextDay] +
          ",";
      }
    }
  }
}
const array = arry.split(",").map(Number);
const makeElement = function(tagName, className, text) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};
const renderCards = function(weatherDay) {
  const listItem = makeElement("li", "day");

  const optionsDate = { weekday: "long", month: "long", day: "numeric" };
  const toDay = new Date(weatherDay.date);
  weatherDay.date = toDay.toLocaleDateString("ru", optionsDate);
  const date = makeElement("h2", "weather--h2", weatherDay.date);
  listItem.appendChild(date);

  if (weatherDay.cloudiness === "Ясно") {
    weatherDay.snow = false;
    weatherDay.rain = false;
  }

  const weatherImage = {
    snow: "/images/snow.svg",
    rain: "/images/rain.svg",
    clouds: "/images/clouds.svg",
    sun: "/images/sun.svg"
  };
  const picture = makeElement("img", "weather__image");
  if (weatherDay.cloudiness === "Облачно") {
    picture.src = weatherImage.clouds;
  }
  if (weatherDay.snow) {
    picture.src = weatherImage.snow;
  }
  if (weatherDay.rain) {
    picture.src = weatherImage.rain;
  }
  if (weatherDay.cloudiness === "Ясно") {
    picture.src = weatherImage.sun;
  }

  listItem.appendChild(picture);

  const temperatureDay = document.createElement("p");
  temperatureDay.classList.add("weather--temperature");
  temperatureDay.innerHTML =
    "днём: " +
    weatherDay.temperature.day +
    "℃  " +
    " ночью: " +
    weatherDay.temperature.night +
    "℃";

  listItem.appendChild(temperatureDay);

  let precipitation;
  if (!weatherDay.snow || !weatherDay.rain) {
    precipitation = "без осадков";
  }
  if (weatherDay.snow) {
    precipitation = "возможен снег";
  }
  if (weatherDay.rain) {
    precipitation = "возможен дождь";
  }
  const options = makeElement(
    "p",
    "weather--p",
    weatherDay.cloudiness + ", " + precipitation
  );

  listItem.appendChild(options);

  return listItem;
};

const cardList = document.querySelector(".days");

for (let i = 1; i < array.length; i++) {
  let cardItem = renderCards(currentData[i]);
  cardList.appendChild(cardItem);
}
// console.log(cardList.scrollLeft);
// console.log(cardList.scrollX);

const buttonLeft = document.querySelector(".left");
const buttonRight = document.querySelector(".right");

const step = document.querySelector(".day").clientWidth;

buttonLeft.onclick = function() {
  cardList.scrollLeft = 0;
};

buttonRight.onclick = function() {
  cardList.scrollLeft = step;
};

cardList.onscroll = function() {
  if (cardList.scrollLeft === step) {
    buttonLeft.disabled = false;
    buttonRight.disabled = true;
  } else {
    buttonLeft.disabled = true;
    buttonRight.disabled = false;
  }
};
