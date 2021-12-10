// nodemon src/app.js -e js, hbs
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static directory to server
app.use(express.static(publicDirectoryPath))


// app.com
app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather',
        name: "Funa, Pamplona, Alvarez, Gaton"
    })
})

// app.com/help
app.get('/help', (req, res) =>{
    res.render('help',{
        helpText: ' This is the text',
        title: 'Help',
        name: 'Funa, Pamplona, Alvarez, Gaton'
    })
})

// app.com/about
app.get('/about', (req, res) =>{
    res.render('about',{
        title: "About Me",
        name: "Funa, Pamplona, Alvarez, Gaton"

    })
})

// app.com/weather
app.get('/weather', (req, res) =>{
    console.log("/weather")
    if(!req.query.address){
        return res.send({
            error: 'Must provide an address'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if (error){
            return res.send({error})
        }
        console.log("/weather")
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            console.log("/weather")

            res.send({
                date: forecastData.date,
                degree: forecastData.degree,
                description: forecastData.description,
                forecast: forecastData,
                location,
                address: req.query.address,
                icon: forecastData.icon
                

            })
        })
    })
})

app.get('/products', (req, res) =>{
    if (!req.query.search){
        return res.send({
            error: 'Must provide search term'
        })    
    }
    

    console.log(req.query.search)
    res.send({
        products: []
    })
})

// /help/404
app.get('/help/*', (req, res) =>{
    res.render('404',{
        title:'404',
        name: 'Funa, Pamplona, Alvarez, Gaton',
        errorMessage: 'Help Article not found'
    })
})

// 404
app.get('*', (req, res) =>{
    res.render("404",{
        title: '404',
        name: 'Funa, Pamplona, Alvarez, Gaton',
        errorMessage: 'Page not found'
    })
})

// to start server
app.listen(port, () =>{
    console.log("Server is up on port "+ port)
})
