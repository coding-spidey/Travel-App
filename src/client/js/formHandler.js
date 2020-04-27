function handleSubmit(event) {
    event.preventDefault()
    const cityName = document.getElementById('cityName').value;
    const date = document.getElementById('date').value;
    // console.log(travelDate, cityName)
    let main = document.querySelector('.main')
    

    fetch('http://localhost:8081/data',
    {
        method: 'POST',
        mode:'cors',
        body: JSON.stringify({date, cityName}),
        headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(function(res) {
        main.innerHTML = "<div class='card'><div class='img'></div><div class='info'></div></div>"
        document.querySelector('.img').innerHTML = `<img src=${res.imgUrl}/>`
        document.querySelector('.info').innerHTML = `<h4>${cityName},${res.countryName}</h4><br><p>Your travel date is : ${date}<br/>The weather during your travel will be ${res.description}, and the temperature would be ${res.temp}° Celsius</p>`
    })
}
export { handleSubmit }