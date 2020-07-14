const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const apiKey = '30e44c0ed0604e5578831add77a30d27';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', { weather: null, error: null });
});

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  request(url, function (err, response, body) {
    if (err) {
      res.render('index', { weather: null, error: 'Ошибка, введите коректные данные' });
    } else {
      let weather = JSON.parse(body);
      let temp = weather.main.temp;
      let tempC = (temp - 32) / 1.8;
      if (weather.main == undefined) {
        res.render('index', { weather: null, error: 'Ошибка, введите коректные данные' });
      } else {
        let weatherText = `В вашем городе ${weather.name} ${tempC.toFixed(1)} °C!`;
        res.render('index', { weather: weatherText, error: null });
      }
    }
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
