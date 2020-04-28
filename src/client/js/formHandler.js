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

    fetch('http://localhost:8081/data',
    {
        method: 'POST',
        mode:'cors',
        body: JSON.stringify({date, cityName, returningDate}),
        headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(function(res) {
        console.log("::::Updating UI::::")
        main.innerHTML = "<div class='card'><div class='img'></div><div class='info'></div></div><button type='button' id='reload'>Click here to resubmit the form</button>"
        document.querySelector('.img').innerHTML = `<img src=${res.imgUrl}/>`
        document.querySelector('.info').innerHTML = `<h4>${cityName}, ${res.countryName}</h4><h5>Your travel date is : ${date}<h5><p>${daysToTrip} days left<br/><br/>Your trip would be ${tripLength} days long.<br/>The weather during your travel will be ${res.description}, and the temperature would be ${res.temp}° Celsius</p>`
        const reload = document.getElementById('reload')
        reload.addEventListener('click', ()=>{
        location.reload()
        })
    })
}
export { handleSubmit,countDays }