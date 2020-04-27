import { request } from "http";
let countryName
function handleSubmit(event) {
    event.preventDefault()
    const cityName = document.getElementById('cityName').value;
    const date = document.getElementById('date').value;
    // console.log(travelDate, cityName)
    const main = document.querySelector('.main')
    console.log('testing')

    fetch('http://localhost:8081/credentails')
    .then(req=>req.json())
    .then(async function(req) {
        const cordUsername = req.cordUsername
        const weatherKey = req.weatherKey
        const pixabayKey = req.pixabayKey
        const weatherData = await extractCoordinate(cityName, date, cordUsername, weatherKey)
        const imgUrl = await getImage(cityName, pixabayKey)
        console.log("---Updating UI---")
        main.innerHTML = "<div class='card'><div class='img'></div><div class='info'></div></div>"
        document.querySelector('.img').innerHTML = `<img src=${imgUrl}/>`
        document.querySelector('.info').innerHTML = `<h4>${cityName}, ${countryName}</h4><br><p>Your travel date is : ${date}<br/>The weather during your travel will be ${weatherData.description}, and the temperature would be ${weatherData.temp}° Celsius</p>`
    })
}
async function extractCoordinate(destination, travelDate, cordUsername, weatherKey) {
    const coordinateLink =`http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${cordUsername}`
    const cordData = await fetch(coordinateLink)
    const json = await cordData.json()
    const lat = json.geonames[0].lat
    const lon = json.geonames[0].lng
    countryName = json.geonames[0].countryName
    const temp = (await getWeather(lat, lon, travelDate, weatherKey)).temp
    const description = (await getWeather(lat, lon, travelDate, weatherKey)).description
    return {
        temp,
        description
    }
}
async function getWeather(lat, lon, travelDate, weatherKey) {
    const resp = await fetch(`https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lon}&key=${weatherKey}&start_date=${travelDate}`)
    const weatherData = await resp.json()
    const temp = weatherData.data[0].temp
    const description = weatherData.data[0].weather.description
    return{
        temp,
        description
    }
}
async function getImage(destination, pixabayKey) {
    const resp = await fetch(`https://pixabay.com/api/?key=${pixabayKey}&q=${destination}&image_type=photo`)
    const json = await resp.json()
    const hits = json.hits
    if(hits.length==0) {
        const resp = await fetch(`https://pixabay.com/api/?key=${pixabayKey}&q=${countryName}&image_type=photo`)
        const json = await resp.json()
    }
    const imgUrl = json.hits[0].webformatURL
    return(imgUrl)
}
export { handleSubmit }