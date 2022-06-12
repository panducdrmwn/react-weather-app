import axios from 'axios';
import {React, useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import './Forecast.css'
import backbutt from '../../Images/backbutt.png';

const Forecast = () => {

    const [forecast, setForecast] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const api = {
        key : "5753c1f304f16ccb493d187a7351c953", 
        base : "https://api.openweathermap.org/data/2.5/"
    }

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    useEffect (()=>{
        axios.get(`${api.base}onecall?lat=${location.state.lats}&lon=${location.state.longs}&units=metric&appid=${api.key}`).then
        ((response)=>{
            console.log(response.data)
            setForecast(response.data)
        })
    },[])

    function displayDay(d) {
        var date = new Date(d * 1000);
        return days[date.getDay()];
      }

  return (
    <>
    {forecast.timezone != undefined &&
    
    <div className='forecast'>
     <img src={backbutt} className='backButton' onClick={()=>navigate('/')}/>
        
        <div className='currentWeather'>
            <div className='currentLeft'>
                <p className='currentStatsTemp'>{Math.round(location.state.temp)}°</p>
                <p className='currentStatsName'>{location.state.query}</p>
            </div>
            <div className='currentRight'>
                <img className='currentStatsIcon' src={`http://openweathermap.org/img/wn/${forecast.current.weather[0]?.icon}@2x.png`}/>
                <p className='currentStatsWeather'>{location.state.weather}</p>
            </div>
        </div>

        <div className='weeklyWeather'>

           

           <div className='weekly'>
                <div className='weeklyContent'>
                    <div className='next1'>
                        <p>{displayDay(forecast.daily[1].dt)}</p>
                        <img className='dailyIcon' src={`http://openweathermap.org/img/wn/${forecast.daily[1].weather[0].icon}@2x.png`}></img>
                        <p>▼ {Math.round(forecast.daily[1].temp.min)}°c</p>
                        <p>▲ {Math.round(forecast.daily[1].temp.max)}°c</p>
                    </div>
                    <div className='next1'>
                        <p>{displayDay(forecast.daily[2].dt)}</p>
                        <img className='dailyIcon' src={`http://openweathermap.org/img/wn/${forecast.daily[2].weather[0].icon}@2x.png`}></img>
                        <p>▼ {Math.round(forecast.daily[2].temp.min)}°c</p>
                        <p>▲ {Math.round(forecast.daily[2].temp.max)}°c</p>
                    </div>
                    <div className='next1'>
                        <p>{displayDay(forecast.daily[3].dt)}</p>
                        <img className='dailyIcon' src={`http://openweathermap.org/img/wn/${forecast.daily[3].weather[0].icon}@2x.png`}></img>
                        <p>▼ {Math.round(forecast.daily[3].temp.min)}°c</p>
                        <p>▲ {Math.round(forecast.daily[3].temp.max)}°c</p>
                    </div>
                    <div className='next1'>
                        <p>{displayDay(forecast.daily[4].dt)}</p>
                        <img className='dailyIcon' src={`http://openweathermap.org/img/wn/${forecast.daily[4].weather[0].icon}@2x.png`}></img>
                        <p>▼ {Math.round(forecast.daily[4].temp.min)}°c</p>
                        <p>▲ {Math.round(forecast.daily[4].temp.max)}°c</p>
                    </div>
                    <div className='next1'>
                        <p>{displayDay(forecast.daily[5].dt)}</p>
                        <img className='dailyIcon' src={`http://openweathermap.org/img/wn/${forecast.daily[5].weather[0].icon}@2x.png`}></img>
                        <p>▼ {Math.round(forecast.daily[5].temp.min)}°c</p>
                        <p>▲ {Math.round(forecast.daily[5].temp.max)}°c</p>
                    </div>
                </div>
           </div>
        </div>
    </div>
}
</>
  )
}

export default Forecast
