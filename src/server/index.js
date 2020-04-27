projectData = {}

const dotenv = require("dotenv").config({ path: './src/server/.env' })
  
var path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

app.use(express.static('dist'))
app.use(bodyParser.json())
app.use(cors())

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
   console.log('Example app listening on port 8081!')
})

let countryName


async function extractCoordinate(destination, travelDate) {
    const cordUsername = process.env.cordUsername
    const coordinateLink =`http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${cordUsername}`
    const cordData = await fetch(coordinateLink)
    const json = await cordData.json()
    const lat = json.geonames[0].lat
    const lon = json.geonames[0].lng
    countryName = json.geonames[0].countryName
    projectData.countryName = countryName
    await getWeather(lat, lon, travelDate)
}
async function getWeather(lat, lon, travelDate) {
    const weatherKey = process.env.WEATHER_KEY
    const resp = await fetch(`https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lon}&key=${weatherKey}&start_date=${travelDate}`)
    const weatherData = await resp.json()
    const temp = weatherData.data[0].temp
    const description = weatherData.data[0].weather.description
    projectData.temp = temp
    projectData.description = description
}
async function getImage(destination, countryName) {
    const pixabayKey = process.env.PIXABAY_KEY
    const resp = await fetch(`https://pixabay.com/api/?key=${pixabayKey}&q=${destination}&image_type=photo`)
    const json = await resp.json()
    const hits = json.hits
    if(hits.length==0) {
        const resp = await fetch(`https://pixabay.com/api/?key=${pixabayKey}&q=${countryName}&image_type=photo`)
        const json = await resp.json()
    }
    const imgUrl = json.hits[0].webformatURL
    projectData.imgUrl = imgUrl
}
app.post('/data',async (req,res)=>{
    const travelDate = req.body.date
    const destination = req.body.cityName
    await extractCoordinate(destination, travelDate)
    await getImage(destination, countryName)
    try {
        console.log("Sending data");
        res.send(projectData)
    } catch(error) {
      console.log(error);
    }
})