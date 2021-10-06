let now = new Date();
let hours = now.getHours();
hours = hours > 9 ? hours : "0" + hours;
let minutes = now.getMinutes();
minutes = minutes > 9 ? minutes : "0" + minutes;
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${hours}:${minutes}`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let humidityElement = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = humidityElement;
  let feelsLikeElement = Math.round(response.data.main.feels_like);
  let feels = document.querySelector("#feels");
  feels.innerHTML = feelsLikeElement;

  let windElement = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = windElement;
  let descriptionElement = response.data.weather[0].main;
  let description = document.querySelector("#description");
  description.innerHTML = descriptionElement;
  let h3 = document.querySelector("h3");
  h3.innerHTML = temperature;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
}

function city(event) {
  event.preventDefault();
  let submitCity = document.querySelector("#submit-city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = submitCity.value;
  let apiKey = "38e8582f06eeb7afd14098ba0b2af46c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${submitCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  if (submitCity.value) {
    h1.innerHTML = submitCity.value;
  } else {
    alert("Please type a city");
  }
}



let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", city);

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
