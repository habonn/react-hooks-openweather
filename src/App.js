import React, { useEffect, useState } from 'react';
import Weather from './app_component/weather.component';
import Form from './app_component/form.component';
import './App.css';
import 'weather-icons-npm/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';

//api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_key}`
const API_key = "f78b9a5dc3a7b8356581d29fc43617c7"

const App = () => {
  
  const [icon, setIcon] = useState('');
  const [main, setMain] = useState('');
  const [celsius, setCelsius] = useState('');
  const [tempmax, setTempmax] = useState('');
  const [tempmin, setTempmin] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);
  const [filterObj, setFilterObj] = useState(
    { city: '', country: '' }
  );


  useEffect(() => {

    const getDt = () => {

      if (filterObj.city && filterObj.country) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${filterObj.city},${filterObj.country}&appid=${API_key}`)
        .then(res => {
          setMain(`${res.data.name}, ${res.data.sys.country}`);
          setCelsius(calCelsius(res.data.main.temp));
          setTempmin(calCelsius(res.data.main.temp_min));
          setTempmax(calCelsius(res.data.main.temp_max));
          setDescription(res.data.weather[0].description);
          get_WeatherIcon(weatherIcon, res.data.weather[0].id);
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
      setError(false);

    }
  }
  getDt();

  }, [filterObj]);

  const weatherIcon = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog"
  };

  

  function get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        setIcon(icons.Thunderstorm);
        break;
      case rangeId >= 300 && rangeId <= 321:
        setIcon(icons.Drizzle);
        break;
      case rangeId >= 500 && rangeId <= 521:
        setIcon(icons.Rain);
        break;
      case rangeId >= 600 && rangeId <= 622:
        setIcon(icons.Snow);
        break;
      case rangeId >= 701 && rangeId <= 781:
        setIcon(icons.Atmosphere);
        break;
      case rangeId === 800:
        setIcon(icons.Clear);
        break;
      case rangeId >= 801 && rangeId <= 804:
        setIcon(icons.Clouds);
        break;
      default:
        setIcon(icons.Clouds);
    }
  }


  const [title, setTitle] = useState('');
  const [title2, setTitle2] = useState('');



  const handleChangeCity = event => {
    setTitle(event.target.value);
  };

  const handleChangeCountry = event => {
    setTitle2(event.target.value);

  };


  const handleSubmit = event => {
    event.preventDefault();
    if(title === '' && title2 === ''){
      return setError(true),
      setMain(''),
      setCelsius(''),
      setTempmin(''),
      setTempmax(''),
      setDescription(''),
      setIcon('')
      ;
    } else {
      setFilterObj({
        city:title,
        country:title2
      });
  

  
      return setError(false);
    }

  };

  function calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  return (
    <div className="App">
      <Form
       
        handleSubmit={handleSubmit}
        handleChangeCity={handleChangeCity}
        handleChangeCountry={handleChangeCountry}
        error={error}
      />
      <Weather
        city={main}
        weatherIcon={icon}
        temp_celsius={celsius}
        tempmin={tempmin}
        tempmax={tempmax}
        description={description}

      />

    </div>
  );
};

export default App;

