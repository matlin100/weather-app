const request = require('request')


const forecast = ({latitod, longtde}, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=819e9c6b8c04be7cf90502b93b45afe2&query='+ latitod + ',' + longtde; 
    request({url, json: true} , (error ,{body}) => {
        if(error)
          callback('con\'t conect to the server' , error)
        else if (body.error)
            callback('con\'t finde the loction ',error)
        else
            callback(error ,{
                temperature: body.current.temperature,
                location: body.location.name,
                country :body.location.country,
                localtime : body.location.localtime,
                weather_icons: body.current.weather_icons[0],
                is_day : body.current.is_day,
                weather_descriptions: body.current.weather_descriptions[0],
                feelslike: body.current.feelslike,
            }) 
    })           
}
module.exports = forecast