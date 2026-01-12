const apiKey = "52184c3e10bed5a6bd3ceab8f0d6937f";

async function getWeather() {
  const cityInput = document.getElementById("city");
  const city = cityInput.value.trim();
  const resultDiv = document.querySelector(".result");
  const body = document.body;

  if (city === "") {
    alert("Please enter a city name");
    return;
  }

 
  resultDiv.style.display = "block";
  resultDiv.innerHTML = "Loading...";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      resultDiv.innerHTML = "City not found ❌";
      return;
    }

    const data = await response.json();


    const name = data.name;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const description = data.weather[0].description;
    const weatherMain = data.weather[0].main.toLowerCase();
    const iconCode = data.weather[0].icon;

    const capitalDesc =
      description.charAt(0).toUpperCase() + description.slice(1);

   
    body.className = "";

    if (weatherMain.includes("clear")) {
      body.classList.add("sunny");
    } else if (weatherMain.includes("cloud")) {
      body.classList.add("cloudy");
    } else if (weatherMain.includes("rain") || weatherMain.includes("drizzle")) {
      body.classList.add("rainy");
    } else if (weatherMain.includes("snow")) {
      body.classList.add("snowy");
    } else {
      body.classList.add("sunny");
    }

 
    if (iconCode.includes("n")) {
      body.className = "clear-night";
    }

   
    resultDiv.innerHTML = `
      <h2>${name}</h2>
      <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="weather icon">
      <p>Temperature: ${temp} °C</p>
      <p>Weather: ${capitalDesc}</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind Speed: ${wind} km/h</p>
    `;

  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = "Something went wrong ❌";
  }
}


document.getElementById("city").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});
