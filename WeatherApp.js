const apikey = '42efee9df854560949b6b7de80b826fc';
const input = document.querySelector("input");
const btn = document.getElementById("btn");
const icon = document.querySelector(".icon");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const windspeed = document.querySelector(".windspeed");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity");
const errorMessage = document.querySelector(".error-message");
let countyCode = document.getElementById('country-code');

btn.addEventListener("click",()=>{
     clearScreen();
    let inputValue = input.value;
    getweather(inputValue);
})

countyCode.addEventListener("change",()=>{
    clearScreen();
    input.value = "";
})

function getweather(inputValue){
    // console.log(city);
    const apiKey = '42efee9df854560949b6b7de80b826fc';
    let url;
    let countryCode = document.getElementById('country-code').value;

    if(!isNaN(inputValue)){
        //Pin Code

        url = `https://api.openweathermap.org/data/2.5/weather?zip=${inputValue},${countryCode}&appid=${apiKey}`;
    }

    else{
        //City Name

        url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`;
    }

    fetch(url)
    .then(function (response){
        return response.json();
    })
    .then(data => {
        // console.log(data)
        if (data.cod === "404") {
            clearScreen();
            errorMessage.style.display = 'block';  // Show the error message
            errorMessage.innerHTML = 'City or Pincode not found. Please check your input.';
        }
        
        else
        {

        const iconCode = data.weather[0].icon;
        icon.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${iconCode}@4x.png" 
        alt="Weather Icon"/>
        `;

        const weatherCity = data.name;
        const weatherCountry = data.sys.country; 
        weather.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${weatherCity},${weatherCountry}`;


        let weatherTemp = data.main.temp;
        weatherTemp = weatherTemp - 273;
        const temp = weatherTemp.toFixed(2);
        temperature.innerHTML = `Temperature: ${temp}°C`;


        const weatherwind = data.wind.speed;
        windspeed.innerHTML = `Wind Speed: ${weatherwind} m/s`;


        const weatherdescription = data.weather[0].description;
        description.innerHTML = `Description: ${weatherdescription}`;


        const weatherhumidity = data.main.humidity;
        humidity.innerHTML = `Humidity: ${weatherhumidity}%`;
    }
     })
     .catch(err => {
        console.error("Error occurred while fetching data:", err);
     })
    
}

function clearScreen() {
    icon.innerHTML = '';              
    weather.innerHTML = '';          
    temperature.innerHTML = '';       
    windspeed.innerHTML = '';         
    description.innerHTML = '';      
    humidity.innerHTML = '';         
    errorMessage.style.display = 'none'; 
}



