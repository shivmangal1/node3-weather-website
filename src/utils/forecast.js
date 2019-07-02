const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/4095b96a02a0bae26d00911063674c7a/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect location service', undefined);
        } else if (body.daily.data.length === 0) {
            callback('Unable to find location.Try another search', undefined);
        } else {
            const data = body.daily.data[0];
            // callback(undefined, {
            //     summary: data.summary,
            //     precipProbability: data.precipProbability * 100,
            //     temperatureHigh: data.temperatureHigh,
            //     temperatureLow: data.temperatureLow
            // });
            callback(undefined, body.daily.data[0].summary + " It is currently "
                + body.currently.temperature + " degrees out. There is a "
                + body.currently.precipProbability + " chance of rain.");
        }
    });
}

module.exports = forecast