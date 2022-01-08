const express= require('express')
const app = express()
const https = require('https')
const bodyParser= require('body-parser')


app.get('/',function(req,res){
    res.sendFile(__dirname  +"/index.html")

})
app.use(bodyParser.urlencoded({extended:true}))

app.post('/',function(req,res){
    var cityName=req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=3066450361392fcf4377867e6e274a4a&units=metric"

    //res.send('hey there');
    https.get(url,function(response){
        console.log(res);
        console.log(res.statusCode);
        response.on('data',function(data){
            const weatherData= JSON.parse(data)
            const temp= weatherData.main.temp;
            const weatherIcon = weatherData.weather[0].icon
            const weatherDescription= weatherData.weather[0].description
            res.send("the temperature in "+cityName+ "is "+temp +" degree celcious")
            
        })
})
    
})


app.listen(3000, function(){
    console.log('app open on port 3000')
})