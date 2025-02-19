const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeather API key

// Fetch weather data based on city name
function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

// Fetch weather based on user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        }, () => alert("Location access denied!"));
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Fetch and display weather data
function fetchWeatherData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                alert("City not found!");
                return;
            }

            document.getElementById("weatherInfo").innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>🌡️ Temperature: ${data.main.temp}°C</p>
                <p>☁️ Condition: ${data.weather[0].description}</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
                <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
            `;
        })
        .catch(() => alert("Error fetching weather data!"));
}
