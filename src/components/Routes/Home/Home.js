import {React, useEffect, useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import button from '../../Images/enter-butt.png';
import clearnight from '../../Images/clearnight.png';
import clear from '../../Images/clear.png';
import rain from '../../Images/rain.png';
import nightrain from '../../Images/rainNight.png';
import clouds from '../../Images/clouds.png';
import thunder from '../../Images/thunderstorm.png';
import snow from '../../Images/snow.png';
import sunset from '../../Images/sunset.png';
import temps from '../../Images/temp.png';
import wind from '../../Images/wind.png';


const Home = (props) => {
    
    const[longitude, setLongitude]= useState ('')
    const[latitude, setLatitude]= useState ('')
    const [weather, setWeather] = useState ('')
    const [query, setQuery] = useState ('')
    const api = {
      key : "063fcc70353418ca4fd8bf019f0af6bd", 
      base : "https://api.openweathermap.org/data/2.5/"
  }

  useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      })
    },[])

    useEffect(()=>{
      axios.get(`${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`).then
       ((response) => {
         console.log(response.data)
           setWeather(response.data)
        })
  
     },[latitude, longitude])

     

    const dateBuilder = (d) => {
      let months = ["January", "February", "March", "April", "May", "June", "July",
      "August", "September","Oktober","November","Desember"];
      let days = ["Sunday","Monday", "Tuesday", "Wed", "Thusrday","Friday","Saturday",];
    
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
    
      return `${day}, ${date} ${month} ${year}`
    }
    
    const search = (e) =>{
        if (e.key === 'Enter') {
        axios.get(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`).then 
        ((response) => {
            console.log(response.data)
            setWeather(response.data)
            setQuery('')
        } )
    }}
    
    let localTime = new Date((weather.dt*1000)+(weather.timezone*1000));
    let localHours = localTime.getUTCHours();
    let localMinutes = '0' + localTime.getUTCMinutes();
    let formattedTime = localHours + ':' + localMinutes.substr(-2);
    let suntime = new Date(weather.sys?.sunrise * 1000).toLocaleTimeString();
    
    const navigate = useNavigate();
    const toForecast =() => {
        navigate('/forecast', {state:{
          query:weather.name,
          time:formattedTime,
          temp:weather.main.temp,
          lats:weather.coord.lat,
          longs:weather.coord.lon,
          weather:weather.weather[0].main}})
    }
    
    

  return (
    <>
      <div className='App'>
        <div className='search'>
          <input
          type='text'
          className='search-bar'
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder='Search Location...'
          onKeyPress={search} />
          <img className='button-icon' src={button} onClick={search}/>
        </div>

        {weather.name   != undefined &&
          <>
            <div className='weatherbox'>
              <div className='weatherboxContainer'>
              <p className='city'>{weather.name}</p>
              <img className='weather-icon' src={`http://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`}/>
              <h1 className='temp'>{Math.round( weather.main.temp)}°</h1>
              <p className='weather'>{weather.weather[0].main}</p>
              <p className='date'>{dateBuilder(new Date())}</p>
              <p className='localTime'></p> 
              </div>
            </div>
            <div className='butContainer'>
              <button className='viewStats' onClick={()=>toForecast()}>VIEW STATS</button>
            </div>

              <div className='bot'>
                <div className='botcontent'>
                  <div className='sunrise'>
                    <img className='sung' src={sunset} />
                    <p className='suntext'>Sunrise</p>
                    <p className='suntime'>{suntime}</p>
                  </div>
                  <div className='temperature'>
                    <img className='temps' src={temps} />
                    <p>Temperature</p>
                    <p>Celcius</p>
                  </div>
                  <div className='windspeed'>
                    <img className='winds' src={wind} />
                    <p className='wspeed'>Wind Speed</p>
                    <p> {weather.wind.speed} Km/h</p>
                  </div>
                </div>
              </div>
          </>
          
        }
      </div>
    </>
    
  )
}

export default Home