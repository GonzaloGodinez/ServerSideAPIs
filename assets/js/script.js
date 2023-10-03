var apiWeatherKey = "79fcfd41f56545f25f70feefcab32163"
// set up variables such as Denver
var search = document.querySelector(".search")
// 3rd step apend cities data
function getWeather(cityName) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiWeatherKey + "&units=imperial")
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data)
            var cityh5 = document.querySelector("#city")
            cityh5.innerHTML = `${data.name} (${new Date(data.dt * 1000).toLocaleDateString()}) <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">`
            var tempid = document.querySelector("#temp")
            tempid.textContent = `temp ${data.main.temp} F`
            var windid = document.querySelector("#wind")
            windid.textContent = `wind ${data.wind.speed} MPH`
            var humidity = document.querySelector("#humidity")
            humidity.textContent = `humidity ${data.main.humidity}%`
        })
}

function getForecast(cityName) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiWeatherKey + "&units=imperial")
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data)
        })
}
search.addEventListener("click", function () {
    var cityName = document.querySelector(".cityName").value
    console.log(cityName)
    getWeather(cityName)
    getForecast(cityName)
})