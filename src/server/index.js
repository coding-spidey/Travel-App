projectData = {}

require("dotenv").config({ path: './src/server/.env' })
  
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

const cordUsername = process.env.cordUsername
const weatherKey = process.env.WEATHER_KEY
const pixabayKey = process.env.PIXABAY_KEY
const credentails = {
    cordUsername,
    weatherKey,
    pixabayKey
}

app.get('/credentails', sendData)
function sendData(req, res) {
    console.log("---sending credentials---")
    res.send(credentails)
}