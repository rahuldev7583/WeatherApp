const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "d9ec581c28b5a31faa465dcf1763faf7";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" +
    apiKey + "&units=" + unit;
  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp.toFixed(1);
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      res.write(
        "<h1>The temperature in " + query + " is " + temp + " degrees Celsius</h1>"
      );
      res.write(
        "<h3>This weather is currently " + weatherDescription + " </h3>"
      );
      res.write(
        "<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png'>"
      );
      res.send();
    });
  });
});
app.listen(3000, (req, res) => {
  console.log("Server is running at port 3000");
});
