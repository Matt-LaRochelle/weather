const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");

        })

app.post("/", function(req, res){
    // console.log("Post received");
    const lat = req.body.latCoordinate;
    const lon = req.body.lonCoordinate;
    const apiKey = [TOKEN];
    const unit = "imperial";

    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=" + unit;
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const desc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const place = weatherData.name
            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(desc);
            res.write("<p>The weather is currently " + desc + "</p>");
            res.write("<h1>The temperature in " + place + " is " + Math.round(temp) + " degrees Farenheit.</h1>");
            res.write("<img src=" + imageurl +">");
            res.send()
    })
})
})












app.listen(3000, function() {
    console.log("Server is running on port 3000.");
})