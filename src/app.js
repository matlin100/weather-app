const path = require('path')
const hbs = require('hbs')
const geocode = require('./utlis/geocode')
const forecast = require('./utlis/forecast')
const express = require('express')


const app = express()
const port = process.env.PORT || 3000
//define path for express config
const poblicDirectoryPath = path.join(__dirname ,'../poblic')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static dirctory to serve
app.use(express.static(poblicDirectoryPath))

// app.get('', (req , res) => {
//     res.send('<h1> hello express </h1>')
// })

// app.get('/help', (req , res) => {
//     res.send(poblicDirectoryPathhelp )
// })

// app.get('/about', (req , res) => {
//     res.send(poblicDirectoryPathAbout)
// })

app.get('/', (req ,res) => {
    res.render('index',{
        title:'weather app',
        name:'hezeki',
    })
})

app.get('/about', (req ,res) => {
    res.render('about',{
        title:'about me  ',  
        name:'hezeki',
        img: '../poblic/img/IMG_7856.jpeg'
    })
})

app.get('/help', (req ,res) => {
    res.render('help',{
        title:'help ',
        name:'hezeki',
    })
})

app.get('/help/*',(req, res) => {
    res.render('404',{
        title:'404',
        name:'hezeki',
        erorrMessage:'page help/ not found'
    })
})

app.get('/weather', (req , res) => {
    const address =req.query.address
    if(!address)
    return res.send({
         erorr: 'you must provide address tarm'
     })
     geocode(address , (error ,data) => {
        if(error) 
            return console.log(error)
        forecast(data, (error, data) => {
            if(error)
                return res.send(error)
            res.send(data)
        })
    })
})



app.listen(port, () => {
    console.log('server is up on port '+ port)
})