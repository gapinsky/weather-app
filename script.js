const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=32a466bf9582f9e6252139d815b9e346'
const API_UNITS ='&units=metric'


const getWeather = () => {
    const city = input.value || 'New York'
    const URL = API_LINK + city + API_KEY + API_UNITS

    axios.get(URL).then(res => {
        const temp = res.data.main.temp
        const weath = res.data.weather[0].main
        const hum = res.data.main.humidity
        const status = Object.assign({}, ...res.data.weather)
        

        if (status.id >= 200 && status.id <= 232 ){
            photo.setAttribute('src', './img/thunderstorm.png')
        } else if(status.id >= 300 && status.id <= 321) {
           photo.setAttribute('src', './img/drizzle.png')
        } else if(status.id >= 500 && status.id <= 521) {
            photo.setAttribute('src', './img/rain.png')
         } else if(status.id >= 600 && status.id <= 622) {
            photo.setAttribute('src', './img/ice.png')
         } else if(status.id >= 701 && status.id <= 781) {
            photo.setAttribute('src', './img/fog.png')
         } else if(status.id === 800) {
            photo.setAttribute('src', './img/sun.png')
         } else if(status.id >= 801 && status.id <= 804) {
            photo.setAttribute('src', './img/cloud.png')
         } else {
            photo.setAttribute('src', './img/unknown.png')
         }

        cityName.textContent = res.data.name
        temperature.textContent = Math.floor(temp) + '°C'
        humidity.textContent = hum + '%'
        weather.textContent = status.main

        warning.textContent = ''
        input.value = ''
        
    }).catch(()=> warning.textContent ='Wpisz poprawną nazwe miasta!')
}

const enter = (e) => {
    if(e.key === 'Enter'){
        getWeather()
}
}

input.addEventListener('keyup', enter)
button.addEventListener('click', getWeather)