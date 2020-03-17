const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/299d6e40caaecbf818aa0ea041ef9d28/'+lat+','+long+'?units=ca'
    // console.log(url)
    request({
            url,
            json: true
        }, (error, {body}) => {
        
            if(error){
                callback('Unable to connect to weather service!',undefined)
            } else if (body.error) {
                callback(body.code+':'+body.error, undefined)
            } else {
                const temp = body.currently.temperature
                const rainProb = body.currently.precipProbability
                callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + 
                ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain. The temperature high today is ' + 
                body.daily.data[0].temperatureHigh + ' degrees and a low of ' + body.daily.data[0].temperatureLow + ' degrees.')
            }
        })
}

module.exports = forecast