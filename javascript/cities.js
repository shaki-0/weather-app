let current = new Date();
let hours = current.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = current.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[current.getDay()];

let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${hours}:${minutes}`;

function showDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast-temperatures");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDays, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
        <div class = "weather-forecast-date"> ${showDay(forecastDays.dt)} </div>
         <img class= "icon-size" src = src/images/${
           forecastDays.weather[0].icon
         }.png
         />
          <span class="weather-temp-max"> ${Math.round(
            forecastDays.temp.max
          )}° </span>
          <span class="weather-temp-min"> ${Math.round(
            forecastDays.temp.min
          )}°</span>
        </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperatureElement = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = temperatureElement;

  celsius = response.data.main.temp;

  let humidityElement = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = humidityElement;

  let feelsLikeElement = Math.round(response.data.main.feels_like);
  let feels = document.querySelector("#feels");
  feels.innerHTML = feelsLikeElement;

  let windElement = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = windElement;

  let descriptionElement = response.data.weather[0].description;
  let description = document.querySelector("#description");
  description.innerHTML = descriptionElement;

  let cityName = response.data.name;
  let city = document.querySelector("#city");
  city.innerHTML = cityName;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `src/images/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(submitCity) {
  let apiKey = "38e8582f06eeb7afd14098ba0b2af46c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${submitCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let submitCity = document.querySelector("#submit-city-input");
  search(submitCity.value);
}

function displayPosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function showLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(displayPosition);
}

let button = document.querySelector("#location");
button.addEventListener("click", showLocation);

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = (celsius * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheit);
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsius);
}

let celsius = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

search("London");
