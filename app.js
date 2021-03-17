const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/")

});

app.post("/",function(req,res){

  const query = req.body.cityName ;
  const apikey = "eef9de7c9b2a0926c3f99f3a1a52c9eb";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid="+ apikey + "&units=" + units;

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      const weatherdec = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>The temperature in "+ req.body.cityName + " is " + temp + " degrees Celcius.</h1>");
      res.write("<h3><em>The Weather is " + weatherdec + "</em><br>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    })
  });
});




app.listen(3000,function(){
  console.log("server started");
});
