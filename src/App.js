import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      console.log("현재위치", lat, lon)
    });
  }

  
  useEffect(()=>{
    getCurrentLocation();
  },[])
  return (
    <div>
      현재위치 가져오기
    </div>
  );
}

export default App;
