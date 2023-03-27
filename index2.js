const API_KEY = "f6abe39f60ff72d30425cf0af92b7459";

async function fetchWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
    const data = await response.json();
    return data;
}

function renderWeather(city) {
        
    return `
        <div class="weather loading">
        <h2 class="city">Weather in ${city.name}</h2>
        <h1 class="temp">${city.main.temp}°C</h1>
        <img src="https://openweathermap.org/img/wn/${city.weather[0].icon}.png" alt="" class="icon">
        <div class="description">${city.weather[0].description}</div>
        <div class="humidity">Humidity: ${city.main.humidity}%</div>
        <div class="wind">Wind speed: ${city.wind.speed}km/h</div>
        </div>
    `;
    
}

async function updateWeather(city, selector) {
    const data = await fetchWeatherData(city);
    const html = renderWeather(data);
    const wrapper = document.querySelector(selector);
    wrapper.innerHTML = html;
}

async function onSearchChange(event) {
    const city = event.target.value;
    updateWeather(city, ".weather__wrapper");
    const imageUrl = `https://source.unsplash.com/1600x900/?${city}`;
    document.body.style.backgroundImage = `url(${imageUrl})`
}        

let previousRandomCity;

async function updateRandomWeather() {
    const cities = [
        "Houston",
        "Atlanta",
        "Honolulu",
        "Paris",
        "Hawaii",
        "Los Angeles",
        "San Francisco",
        "Nairobi",
        "Helsinki",
        "Lisbon",
        "Stockholm",
        "Oslo",
        "Denver",
        "Rio",
        "Belarus",
        "Kyiv",
        "Moscow",
        "Johannesburg",
        "Madrid",
        "London",
        "Dubai"
    ];

    let randomCity1 = cities[Math.floor(Math.random() * cities.length)];
    let randomCity2 = cities[Math.floor(Math.random() * cities.length)];
    while (randomCity2 === randomCity1) {
        randomCity2 = cities[Math.floor(Math.random() * cities.length)];
    }
    let randomCity3 = cities[Math.floor(Math.random() * cities.length)];
    while (randomCity3 === randomCity1 || randomCity3 === randomCity2 || randomCity3 === previousRandomCity) {
        randomCity3 = cities[Math.floor(Math.random() * cities.length)];
    }
    let randomCity4 = cities[Math.floor(Math.random() * cities.length)];
    while (randomCity4 === randomCity1 || randomCity4 === randomCity2 || randomCity4 === randomCity3 || randomCity4 === previousRandomCity) {
        randomCity4 = cities[Math.floor(Math.random() * cities.length)];
    }
    let randomCity5 = cities[Math.floor(Math.random() * cities.length)];
    while (randomCity5 === randomCity1 || randomCity5 === randomCity2 || randomCity5 === randomCity3 || randomCity5 === randomCity4 || randomCity5 === previousRandomCity) {
        randomCity5 = cities[Math.floor(Math.random() * cities.length)];
    }

    
    updateWeather(randomCity2, ".weather__around");
    updateWeather(randomCity3, ".weather__around2");
    updateWeather(randomCity4, ".weather__around3");
    updateWeather(randomCity5, ".weather__around4");

    previousRandomCity = randomCity3;
}


updateWeather("Washington", ".weather__wrapper");
updateRandomWeather();
setInterval(updateRandomWeather, 30000);
