const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?country=in&limit=1&access_token=pk.eyJ1IjoibmVvZ3JhcGhlciIsImEiOiJjazd0eXpobXIwc2FqM2ZuMXo4ZGpscWs4In0.c5C13ENr0qzI5R9Jtaz3EQ'
    // console.log(url)
    request({
            url,
            json: true  
        }, (error, {body}) => {
            if(error) {
                callback('Unable to connect to location services', undefined)
            } else if(body.features.length === 0){
                callback('Unable to find location. Try with another search term.', undefined)
            }
             else {
                const long = body.features[0].center[0]
                const lat = body.features[0].center[1]
                const location = body.features[0].place_name
                callback(undefined, {
                    latitude: lat,
                    longitude: long,
                    location: location
                })
            }
        })
}

module.exports = geocode