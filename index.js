const express = require('express');
const cors = require('cors');
require('dotenv').config()
const axios = require('axios')
const port = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cors())


app.get('/',()=>{
    res.send('Weather api is running')
})

app.get('/location', (req,res)=>{
    axios.get('https://api.geoapify.com/v1/geocode/search?text=Dhaka&lang=en&limit=10&type=city&apiKey=d5ed64c2b55948778613d88e9c625b67')
    .then(res1=>{
        axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${res1.data.features?.[0].properties.lat}&longitude=${res1.data.features?.[0].properties.lon}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`)
        .then(res2=>{
             res.send(res2.data)
        })
    })   
})

app.get('/history', (req,res)=>{
        axios.get('https://api.geoapify.com/v1/geocode/search?text=Dhaka&lang=en&limit=10&type=city&apiKey=d5ed64c2b55948778613d88e9c625b67')
    .then(res1=>{
        axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${res1.data.features?.[0].properties.lat}&longitude=${res1.data.features?.[0].properties.lon}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`)
        .then(res2=>{
             res.send(res2?.data)
        })
    })  
})

app.get('/findHistory', (req,res)=>{
    const {location} = req.query 
    axios.get(`https://api.geoapify.com/v1/geocode/search?text=${location}&lang=en&limit=10&type=city&apiKey=d5ed64c2b55948778613d88e9c625b67`)
    .then(res1=>{
        if(res1.data.features?.[0]){
            axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${res1.data.features?.[0].properties.lat}&longitude=${res1.data.features?.[0].properties.lon}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`)
        .then(res2=>{
             res.send(res2?.data)
        })
        }
    })  
})

app.get('/findLocation', (req,res)=>{
    const {location} = req.query 
    axios.get(`https://api.geoapify.com/v1/geocode/search?text=${location}&lang=en&limit=10&type=city&apiKey=d5ed64c2b55948778613d88e9c625b67`)
    .then(res1=>{
        if(res1.data.features?.[0]){
            axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${res1.data.features?.[0].properties.lat}&longitude=${res1.data.features?.[0].properties.lon}&past_days=7&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`)
        .then(res2=>{
             res.send(res2?.data)
        })
        }
    })   
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})