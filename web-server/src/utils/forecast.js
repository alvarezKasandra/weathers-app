const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a3371e89db999a6f68a7a908b9195a56&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        }

        else {
            const temperature = body.current.temperature
            const feelslike = body.current.feelslike
            const weather_descriptions = body.current.weather_descriptions[0]
            const icon = body.current.weather_icons
            
            var date = body.location.localtime
            console.log(date.toLocaleString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            }))
            console.log(body.location.localtime)
            callback(undefined, {
                date: date,
                icon: icon,
                degree: temperature,
                description: weather_descriptions
            })

        }
    })

}

module.exports = forecast
