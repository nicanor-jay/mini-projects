(function () {
	const API_ENDPOINT = "https://weather-proxy.freecodecamp.rocks/api/current";

	let tempUnit = true;

	const changeTempUnit = () => {
		// Get DOM elements
		const temperatureValueCelciusElement = document.getElementById(
			"temperature-value-celcius"
		);
		const temperatureValueFahrenheitElement = document.getElementById(
			"temperature-value-fahrenheit"
		);

		const feelsLikeCelcius = document.getElementById(
			"feels-like-celcius-label"
		);
		const feelsLikeFahrenheit = document.getElementById(
			"feels-like-fahrenheit-label"
		);

		// Toggle temperature unit
		tempUnit = !tempUnit;
		const temperatureUnitElement = document.getElementById("temperature-unit");
		temperatureUnitElement.textContent = tempUnit ? "°C" : "°F";

		// Show/hide temperature values based on the unit
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
		const urlString = `${API_ENDPOINT}?lon=${lon}&lat=${lat}`;
		fetch(urlString)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("Request failed. Status:", response.status);
				}
			})
			.then(({ name, sys, weather, main }) => {
				// Update HTML elements with weather data

				// Location
				const locationCityElement = document.getElementById(
					"location-name-label"
				);
				locationCityElement.textContent = name;

				const locationCountryElement = document.getElementById(
					"location-country-label"
				);
				locationCountryElement.textContent = `, ${sys.country}`;

				// Weather icon
				const weatherIconElement = document.getElementById("weather-icon");
				weatherIconElement.src = weather[0].icon;

				// Temperature values
				const temperatureValueCelciusElement = document.getElementById(
					"temperature-value-celcius"
				);
				temperatureValueCelciusElement.textContent =
					Math.round(main.temp * 10) / 10;

				const temperatureValueFahrenheitElement = document.getElementById(
					"temperature-value-fahrenheit"
				);
				temperatureValueFahrenheitElement.textContent = Math.round(
					(main.temp * 9) / 5 + 32
				);

				// Weather description
				const weatherDescElement = document.getElementById("weather-desc");
				weatherDescElement.textContent = weather[0].main;

				// Temperature unit
				const temperatureUnitElement =
					document.getElementById("temperature-unit");
				temperatureUnitElement.textContent = tempUnit ? "°C" : "°F";

				// "Feels like" temperature
				const feelsLikeCelciusElement = document.getElementById(
					"feels-like-celcius-label"
				);
				feelsLikeCelciusElement.textContent = `Feels like ${
					Math.round(main.feels_like * 10) / 10
				}°C`;

				const feelsLikeFahrenheitElement = document.getElementById(
					"feels-like-fahrenheit-label"
				);
				feelsLikeFahrenheitElement.textContent = `Feels like ${Math.round(
					(main.feels_like * 9) / 5 + 32
				)}°F`;
			})
			.catch((error) => {
				console.error("Request failed. Network error:", error);
			});
	}

	document.addEventListener("DOMContentLoaded", function () {
		if (navigator.geolocation) {
			// Get current position and fetch weather data
			navigator.geolocation.getCurrentPosition(function (position) {
				const lon = position.coords.longitude;
				const lat = position.coords.latitude;
				getWeather(lon, lat);

				// Add event listener for temperature unit toggle
				const temperatureUnitElement =
					document.getElementById("temperature-unit");
				temperatureUnitElement.addEventListener("click", changeTempUnit);
			});
		} else {
			console.log("Not supported");
		}
	});
})();
