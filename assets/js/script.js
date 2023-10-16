var apiWeatherKey = "79fcfd41f56545f25f70feefcab32163"
// set up variables such as Denver but not limited to only USA cities
var search = document.querySelector(".search")
var searchCity = document.getElementsByClassName(".searchCity")
// append USA and Worldwide cities data by id
var lat
var lon
var cityList = JSON.parse(localStorage.getItem("cityList")) || []
var cityHistory = document.querySelector("#cityHistory")
function displayButton() {
    cityHistory.innerHTML = ""
    for (let i = 0; i < cityList.length; i++) {
        cityHistory.innerHTML += `<li class="list-group-item"><button class="w-100 btn-secondary searchCity">${cityList[i]}</button></li>`
    }
    cityHistory.addEventListener("click", function (event) {
        var cityName=event.target.textContent
        getWeather(cityName)
    })
}
displayButton()
function getWeather(cityName) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiWeatherKey + "&units=imperial")
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data)
            lat = data.coord.lat
            lon = data.coord.lon
            getForecast(lat, lon)
            var cityh5 = document.querySelector("#city")
            if (cityList.includes(data.name) === false) {
                cityList.push(data.name)
                localStorage.setItem("cityList", JSON.stringify(cityList))
                displayButton()
            }
            cityh5.innerHTML = `${data.name} (${new Date(data.dt * 1000).toLocaleDateString()}) <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">`
            var tempid = document.querySelector("#temp")
            tempid.textContent = `temp ${data.main.temp} F`
            var windid = document.querySelector("#wind")
            windid.textContent = `wind ${data.wind.speed} MPH`
            var humidity = document.querySelector("#humidity")
            humidity.textContent = `humidity ${data.main.humidity}%`
        })
}

function getForecast(lat, lon) {
    /* Worldwide cities 5 day forecast selected by class */
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiWeatherKey + "&units=imperial")
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            var card = 0
            for (let index = 0; index < data.list.length; index++) {
                if (data.list[index].dt_txt.includes("15:00:00")) {
                    console.log(data.list[index])
                    console.log(data.list[index].main.temp)
                    var tempidi = document.querySelectorAll(".temp")
                    tempidi[card].textContent = `temp ${data.list[index].main.temp} F`
                    var windidi = document.querySelectorAll(".wind")
                    windidi[card].textContent = `wind ${data.list[index].wind.speed} MPH`
                    var humidityi = document.querySelectorAll(".humidity")
                    humidityi[card].textContent = `humidity ${data.list[index].main.humidity}%`
                    var cardTitleh5 = document.querySelectorAll(".card-title")
                    cardTitleh5[card].innerHTML = `(${new Date(data.list[index].dt * 1000).toLocaleDateString()}) <img src="https://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png" alt="">`
                    card++
                }
            }
            console.log(data)
        })
}
search.addEventListener("click", function () {
    var cityName = document.querySelector(".cityName").value
    console.log(cityName)
    getWeather(cityName)
})

// searchCity.addEventListener("click", function (e) {
//     var cityName = e.target.textContent
//     console.log(cityName)
//     getWeather(cityName)
// })

