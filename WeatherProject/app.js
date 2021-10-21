const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res){

    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/find?q=" + query + "&units=imperial&appid="

    https.get(url, function(response){
      console.log(response.statusCode);

      response.on("data", function(data){
        const weatherData = JSON.parse(data)
        const temp = weatherData.list[0].main.temp
        const weatherDescription = weatherData.list[0].weather[0].description
        const weatherIcon = weatherData.list[0].weather[0].icon
        const imageURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
        res.write("<h1>The temperature is " + temp + " degrees in " + query + " with " + weatherDescription + ".</h1");
        res.write("<img src=" + imageURL + ">");
        res.send()
      })
  })

})

app.listen(3000, function(){
  console.log("Server is running on port 3000.")
})
