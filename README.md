# Travel App

This app processes user data and tells the temperature and weather forecast of the place the user is visiting to. This app uses node.js to create a server and webpack to compress all the files. This app uses three different api to fetch data, they are :

Geolocation Api : To get the co-ordinates of the place.

Weatherbit Api : To get the weather forecast.

Pixabay Api : To get the image of the destination.
- - - -

# Instructions to set-up

- [ ] Install all the required directories.

- [ ] Make account on geonames, weatherbit, pixabay api.

- [ ] Make a .env file and store all the required creddentials in it in the following format : 
 - cordUsername = [your key]
 - WEATHER_KEY = [your key]
 - PIXABAY_KEY = [your key]

- [ ] Initialize the webpack by running the following command on the terminal : 'npm run build-prod'

- [ ] Start your server by using another terminal and run the server by using the command 'npm run start'

- [ ] You should see your app working by now.

# How to use the App

- [ ] Enter the name of the city you're visiting to.

- [ ] Enter your travel date.

- [ ] You should see the weather forecast of that place.
