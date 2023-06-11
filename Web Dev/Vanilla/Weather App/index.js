var api = "https://weather-proxy.freecodecamp.rocks/api/current?lon=";
var tempUnit = true;

const changeTempUnit = () => {
	var temperatureValueCelciusElement = document.getElementById(
		"temperature-value-celcius"
	);
	var temperatureValueFahrenheitElement = document.getElementById(
		"temperature-value-fahrenheit"
	);

	var feelsLikeCelcius = document.getElementById("feels-like-celcius-label");
	var feelsLikeFahrenheit = document.getElementById(
		"feels-like-fahrenheit-label"
	);

	tempUnit = !tempUnit;
	var temperatureUnitElement = document.getElementById("temperature-unit");
	temperatureUnitElement.textContent = tempUnit ? "°C" : "°F";
	if (!tempUnit) {
		temperatureValueFahrenheitElement.classList.remove("hidden");
		temperatureValueCelciusElement.classList.add("hidden");
		feelsLikeFahrenheit.classList.remove("hidden");
		feelsLikeCelcius.classList.add("hidden");
	} else {
		temperatureValueFahrenheitElement.classList.add("hidden");
		temperatureValueCelciusElement.classList.remove("hidden");
		feelsLikeFahrenheit.classList.add("hidden");
		feelsLikeCelcius.classList.remove("hidden");
	}
};

function getWeather(lon, lat) {
	console.log(lon, lat);
	var urlString = api + lon + "&lat=" + lat;
	fetch(urlString)
		.then(function (response) {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error("Request failed. Status:", response.status);
			}
		})
		.then(function (data) {
			//Updating HTML elements
			var locationCityElement = document.getElementById("location-name-label");
			locationCityElement.textContent = data.name;
			var locationCountryElement = document.getElementById(
				"location-country-label"
			);
			locationCountryElement.textContent = ", " + data.sys.country;

			var weatherIconElement = document.getElementById("weather-icon");
			weatherIconElement.src = data.weather[0].icon;

			var temperatureValueCelciusElement = document.getElementById(
				"temperature-value-celcius"
			);
			temperatureValueCelciusElement.textContent =
				Math.round(data.main.temp * 10) / 10;

			var temperatureValueFahrenheitElement = document.getElementById(
				"temperature-value-fahrenheit"
			);
			temperatureValueFahrenheitElement.textContent = Math.round(
				(data.main.temp * 9) / 5 + 32
			);

			var weatherDescElement = document.getElementById("weather-desc");
			weatherDescElement.textContent = data.weather[0].main;

			var temperatureUnitElement = document.getElementById("temperature-unit");
			temperatureUnitElement.textContent = tempUnit ? "°C" : "°F";

			var feelsLikeCelciusElement = document.getElementById(
				"feels-like-celcius-label"
			);
			feelsLikeCelciusElement.textContent =
				"Feels like " + Math.round(data.main.feels_like * 10) / 10 + "°C";

			var feelsLikeFahrenheitElement = document.getElementById(
				"feels-like-fahrenheit-label"
			);
			feelsLikeFahrenheitElement.textContent =
				"Feels like " + Math.round((data.main.feels_like * 9) / 5 + 32) + "°F";
		})
		.catch(function (error) {
			console.error("Request failed. Network error:", error);
		});
}

document.addEventListener("DOMContentLoaded", function () {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			var lon = position.coords.longitude;
			var lat = position.coords.latitude;
			getWeather(lon, lat);
			var temperatureUnitElement = document.getElementById("temperature-unit");
			temperatureUnitElement.addEventListener("click", changeTempUnit);
		});
	} else {
		console.log("Not supported");
	}
});
