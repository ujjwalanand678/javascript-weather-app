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
 
  const {
    name,
    main: { temp, humidity },
    weather,
    wind : {speed}
  } = data;
  const weatherMain = weather[0].main;
  cityName.innerHTML = name;
  temperature.innerHTML = (temp - "273.15").toFixed(1) + "°C";
  humidityChange.innerHTML = humidity + '%';
  windChange.innerHTML = speed + "m/sec";

   ;
  weatherEmoji.src = getWeatherEmoji(weatherMain); 
  
}
function getWeatherEmoji(main) {
  if ((main === "Thunderstorm")) {
    return "./image/thunderstorm.png";
  } else if ((main === 'Drizzle')) {
    return "./image/drizzle.png";
  } else if ((main === 'Rain')) {
    return "./image/rain.png";
  } else if ((main === 'Snow')) {
    return "./image/snow.png";
  } else if ((main === 'Atmosphere')) {
    return "./image/mist.png";
  } else if (main === 'Clear') {
    return "./image/clear.png";
  } else if (main === 'Clouds') {
    return "./image/clouds.png";
  } else {
    return "./image/clear.png"; // fallback
  }
}

