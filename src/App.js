import { useEffect, useState } from 'react';
import WeatherBox from './components/WeatherBox';
import WeatherButton from './components/WeatherButton';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const cities= ['paris', 'new york','tokyo', 'seoul'] 

  // 현재 위치 URL : https://www.w3schools.com/html/html5_geolocation.asp
  const getCurrentLocation=()=>{ 
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat,lon); //getWeatherByCurrentLocation함수에 lat,lon 함수 넘겨주기
    });
  }

  const getWeatherByCurrentLocation = async (lat,lon) =>{
    // 날씨 aip URL : https://openweathermap.org/current
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6c78c13ab292a52960758b0194c09d09&units=metric`
    let response = await fetch(url)
    let data = await response.json();
    setWeather(data) //데이터를 weather저장소에 넣는다.
  }

  const getWeatherByCity= async ()=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6c78c13ab292a52960758b0194c09d09&units=metric`
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  }

  useEffect(()=>{
    getCurrentLocation();
  },[]);

  useEffect(()=>{
    //도시 버튼을 클릭할때마다 도시별 날씨 노출
    getWeatherByCity();
  },[city]) //city값이 바뀌면 useEffect 호출

  return (
    <div>
      <div className="container">
        <WeatherBox weather={weather}/>
        <WeatherButton cities={cities} setCity={setCity}/>
      </div>
    </div>
  );
}

export default App;
