import { request } from "http";
import { countDays } from "./processDates"
let countryName
function handleSubmit(event) {
    event.preventDefault()

    const cityName = document.getElementById('cityName').value; //All the const needed for the function are created here
    const date = document.getElementById('date').value;
    const returningDate = document.getElementById('endDate').value
    const endDate = new Date(returningDate);
    const currentDate = new Date()
    const main = document.querySelector('.main')
    const startDate = new Date(date)
    const daysToTrip = countDays(currentDate, startDate)
    const tripLength = countDays(startDate, endDate)

    fetch('http://localhost:8081/credentails') //A get request to get the credentials from the server 
    .then(req=>req.json())
    .then(async function(req) {
        const cordUsername = req.cordUsername
        const weatherKey = req.weatherKey
        const pixabayKey = req.pixabayKey
        const weatherData = await extractCoordinate(cityName, date, cordUsername, weatherKey, returningDate)
        const imgUrl = await getImage(cityName, pixabayKey)
        console.log("---Updating UI---")
        main.innerHTML = "<div class='card'><div class='img'></div><div class='info'></div></div><button type='button' id='reload'>Click here to resubmit the form</button>"
        document.querySelector('.img').innerHTML = `<img src=${imgUrl}/>`
        document.querySelector('.info').innerHTML = `<h4>${cityName}, ${countryName}</h4><h5>Your travel date is : ${date}<h5><p>${daysToTrip} days left<br/><br/>Your trip would be ${tripLength} days long.<br/>The weather during your travel will be ${weatherData.description}, and the temperature would be ${weatherData.temp}° Celsius</p>`
        const reload = document.getElementById('reload')
        reload.addEventListener('click', ()=>{
        location.reload()
    })
    })
}
async function extractCoordinate(destination, travelDate, cordUsername, weatherKey, returningDate) {
    const coordinateLink =`http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${cordUsername}`
    const cordData = await fetch(coordinateLink)
    const json = await cordData.json()
    const lat = json.geonames[0].lat
    const lon = json.geonames[0].lng
    countryName = json.geonames[0].countryName
    const temp = (await getWeather(lat, lon, travelDate, weatherKey, returningDate)).temp //After getting the latitude and longitude from geoNames Api, we give it to the function where we use weatherBit api
    const description = (await getWeather(lat, lon, travelDate, weatherKey, returningDate)).description
    return {
        temp,
        description
    }
}
async function getWeather(lat, lon, travelDate, weatherKey, returningDate) {
    const resp = await fetch(`https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lon}&key=${weatherKey}&start_date=${travelDate}&end_date=${returningDate}`)
    const weatherData = await resp.json()
    const temp = weatherData.data[0].temp
    const description = weatherData.data[0].weather.description  //weatherBit Api returns the temperature and weather of the input location during the trip time
    return{
        temp,
        description
    }
}
async function getImage(destination, pixabayKey) {
    const resp = await fetch(`https://pixabay.com/api/?key=${pixabayKey}&q=${destination}&image_type=photo`)
    const json = await resp.json()
    const hits = json.hits
    if(hits.length==0) { //checking if the Pixabay api doesn't have any matching Images, we then Use the country name to fetch the Image  
        const resp = await fetch(`https://pixabay.com/api/?key=${pixabayKey}&q=${countryName}&image_type=photo`)
        const json = await resp.json()
        const imgUrl = json.hits[0].webformatURL
        return(imgUrl)
    }
    const imgUrl = json.hits[0].webformatURL
    return(imgUrl)
}
export { handleSubmit,countDays }