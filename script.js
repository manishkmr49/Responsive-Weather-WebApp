"use strict";

const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
const apiKey = `&appid=1dc02c2cda3d32eda98eede7405d0e42`;

const searchField = document.querySelector(".search-area input");
const searchBtn = document.querySelector(".search-area button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeatherData(city) {
    const response = await fetch(`${apiURL}${apiKey}&q=${city}`);
    return response.json();
}

async function displayWeather() {
    const inputName = document.querySelector("#impTXT").value;
    const weatherData = await getWeatherData(inputName);

    if (weatherData.cod !== 200) {
        alert("City not found. Please try again.");
        return;
    }

    document.querySelector(".city").innerHTML = weatherData.name;
    document.querySelector(".temperature").innerHTML = Math.round(weatherData.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = weatherData.main.humidity + "%";
    document.querySelector(".wind").innerHTML = weatherData.wind.speed + " km/h";

    switch (weatherData.weather[0].main) {
        case "Clouds":
            weatherIcon.src = "img/clouds.png";
            break;
        case "Mist":
            weatherIcon.src = "img/mist.png";
            break;
        case "Rain":
            weatherIcon.src = "img/rain.png";
            break;
        case "Drizzle":
            weatherIcon.src = "img/drizzle.png";
            break;
        case "Clear":
            weatherIcon.src = "img/clear.png";
            break;
        case "Snow":
            weatherIcon.src = "img/snow.png";
            break;
        case "Haze":
            weatherIcon.src = "img/haze.png";
            break;
        default:
            weatherIcon.src = "";
    }

    document.querySelector(".weather-display").style.display = "block";
}

searchBtn.addEventListener("click", displayWeather);

searchField.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        displayWeather();
    }
});
