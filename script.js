

const apiKey = '29d104a36eaf7d80aaba21092edec0f6'; 
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function fetchWeather(city) {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found'); 
        }
        const data = await response.json();
        return {
            city: formatCityName(data.name), 
            temperature: `${Math.round(data.main.temp)}°C`, 
            humidity: `${data.main.humidity}%`,
            wind: `${data.wind.speed} km/h`
        };
    } catch (error) {
        return null;
    }
}

function formatCityName(cityName) {
    return cityName.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
}

function updateUI(weatherData) {
    if (weatherData) {
        document.querySelector('.content h2').textContent = weatherData.city;
        document.querySelector('.content h1').textContent = weatherData.temperature;
        document.getElementById('humidity').querySelector('p').textContent = `Humidity: ${weatherData.humidity}`;
        document.getElementById('wind').querySelector('p').textContent = `Wind: ${weatherData.wind}`;
        document.getElementById('error-message').textContent = ''; 
    } else {
        document.getElementById('error-message').textContent = 'City not found. Please check the spelling and try again.'; 
    }
}

document.querySelector('.search').addEventListener('click', async () => {
    const cityInput = document.querySelector('input[type="text"]').value;
    if (cityInput) {
        const weatherData = await fetchWeather(cityInput);
        updateUI(weatherData);
    } else {
        document.getElementById('error-message').textContent = 'Please enter a city name.'; 
    }
});
