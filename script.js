const weatherForm = document.querySelector(".weather-form");
const cityNameInput = document.querySelector(".city-name");
const search = document.querySelector(".btn");
const temperature = document.querySelector(".temp-display");
const cityName = document.querySelector(".city-display");
const humidityChange = document.querySelector(".humidity-0");
const weatherEmoji = document.querySelector(".weather-emoji");
const weatherContainer = document.querySelector(".container");
const windChange = document.querySelector(".wind");
const apiKey = "ccc8ec50064edc7a6c9bbdf754525ac8";
const card = document.querySelector("weather-card");

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityNameInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
    }
  } else {
    alert("Please enter a city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("could not featch weather data");
  }
  return await response.json();
}
function displayWeatherInfo(data) {
 console.log(data);
  const {
    name: city,
    main: { temp, humidity },
    weather: { description, id },
    wind : speed
  } = data;
  cityName.innerHTML = data.name;
  temperature.innerHTML = (data.main.temp - "273.15").toFixed(1) + "°C";
  humidityChange.innerHTML = data.main.humidity + '%';
  windChange.innerHTML = data.wind.speed + "km/h";
  
  
  
}
function getWeatherEmoji(weatherId) {}
