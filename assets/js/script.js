var apiWeatherKey = "79fcfd41f56545f25f70feefcab32163"
// set up variables such as Denver
// 3rd step trying to get it together
function getWeather(cityName){
    fetch ("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiWeatherKey+"&units=imperial")
.then(function(response){
    return response.json()
}) .then (function(data){
    console.log(data)
})
}
getWeather ("Denver")