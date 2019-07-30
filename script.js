var currentData = [
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
    snow: true,
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
    date: 1564747200000,
    temperature: {
      night: 16,
      day: 26
    },
    cloudiness: "Ясно",
    snow: false,
    rain: false
  }
];
var d = new Date();
d.setHours(16, 0, 0, 0);
var n = d.getTime();
var arry = [];
for (var i = 0; i < currentData.length; i++) {
  if (n == currentData[i].date) {
    var currentDay = currentData[i].date;
    var nextDay = currentDay;
    for (k = 1; k < 4; k++) {
      nextDay += 24 * 60 * 60 * 1000;
      if (
        currentData[i + k] !== undefined &&
        currentData[i + k].date == nextDay
      ) {
        var arry = [currentData[i + k].date];
        arry +=
          "," +
          [currentData[i].date] +
          "," +
          [currentData[i + k].date] +
          "," +
          [nextDay] +
          ",";

        console.log(currentData[k].date);
      }
    }
  }
}
console.log(arry);
var array = arry.split(",").map(Number);
console.log(array);
//console.log(nextDay+= );

var makeElement = function(tagName, className, text) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};
var renderCards = function(weatherDay) {
  var listItem = makeElement("li", "day");

  var optionsDate = { weekday: "long", month: "long", day: "numeric" };
  var today = new Date(weatherDay.date);
  weatherDay.date = today.toLocaleDateString("ru", optionsDate);
  var date = makeElement("h2", "weather--h2", weatherDay.date);
  listItem.appendChild(date);

  if (weatherDay.cloudiness === "Ясно") {
    weatherDay.snow = false;
    weatherDay.rain = false;
  }
  var weatherImage = {
    snow: "file:///D:/OSPanel/domains/weather/images/snow.svg",
    rain: "file:///D:/OSPanel/domains/weather/images/rain.svg",
    clouds: "file:///D:/OSPanel/domains/weather/images/clouds.svg",
    sun: "file:///D:/OSPanel/domains/weather/images/sun.svg"
  };
  var picture = makeElement("img", "weather__image");
  if (weatherDay.cloudiness === "Облачно") {
    picture.src = weatherImage.clouds;
    //picture.alt = product.text;
  }
  if (weatherDay.snow) {
    picture.src = weatherImage.snow;
    //picture.alt = product.text;
  }
  if (weatherDay.rain) {
    picture.src = weatherImage.rain;
    //picture.alt = product.text;
  }
  if (weatherDay.cloudiness === "Ясно") {
    picture.src = weatherImage.sun;
  }

  listItem.appendChild(picture);

  //Условие:если облачно - такая-то картинка и т.д
  //var picture = makeElement('img', 'good__image');
  //picture.src = product.imgUrl;
  //picture.alt = product.text;
  //listItem.appendChild(picture);
  var temperatureDay1 = document.createElement("p");
  //console.log('-----', weatherDay);
 temperatureDay1.innerHTML = "днём: " +
 weatherDay.temperature.day +
 "℃" +
 " ночью: " +
 weatherDay.temperature.night +
 "℃";

//   var temperatureDay = makeElement(
//     "p",
//     "weather--p",
//     "днём: " +
//       currentData[i].temperature.day +
//       "℃" +
//       " ночью: " +
//       currentData[i].temperature.night +
//       "℃"
//   );

  listItem.appendChild(temperatureDay1);

  var precipitation;
  if (!weatherDay.snow || !weatherDay.rain) {
    precipitation = "без осадков";
  }
  if (weatherDay.snow) {
    precipitation = "снег";
  }
  if (weatherDay.rain) {
    precipitation = "дождь";
  }
  var options = makeElement(
    "p",
    "weather--p",
    weatherDay.cloudiness + ", " + precipitation
  );

  listItem.appendChild(options);

  return listItem;
};

var cardList = document.querySelector(".days");

for (var i = 0; i < array.length - 1; i++) {
  var cardItem = renderCards(currentData[i]);
  cardList.appendChild(cardItem);
}
console.log(renderCards(currentData));
