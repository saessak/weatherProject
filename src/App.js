import { useEffect, useState } from 'react';
import WeatherBox from './components/WeatherBox';
import WeatherButton from './components/WeatherButton';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [weather, setWeather] = useState(null);

  // 현재 위치 URL : https://www.w3schools.com/html/html5_geolocation.asp
  const getCurrentLocation=()=>{ 
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat,lon); //getWeatherByCurrentLocation함수에 lat,lon 함수 넘겨주기
    });
  }

  const getWeatherByCurrentLocation = async(lat,lon) =>{
    // 날씨 aip URL : https://openweathermap.org/current
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6c78c13ab292a52960758b0194c09d09`
    let response = await fetch(url)
    let data = await response.json();
    setWeather(data) //데이터를 weather저장소에 넣는다.
  }

  
  useEffect(()=>{
    getCurrentLocation();
  },[])
  return (
    <div>
      <WeatherBox />
      <WeatherButton />
    </div>
  );
}

export default App;
