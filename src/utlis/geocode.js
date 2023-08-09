const request = require('request')



const geocode = (addres , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(addres) + '.json?access_token=pk.eyJ1IjoibWF0bGluIiwiYSI6ImNsYnpwNHJjYzA5cW0zcHFtdTVmMW11cjQifQ.SakbFPZqNDtXDpPzGbbRCw&limit=1'
    request({url,json: true} , (error , response) => { 
        if(error)
            callback('con\'t conet to server',error)
        else if (response.body.features.length === 0 )
            callback('don\'t raconiz the addres',error)
        else 
            callback(error,{
                latitod : response.body.features[0].center[1],
                longtde : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
    })
}


module.exports = geocode