import moment from 'moment';
import WeatherIcon from './WeatherIcon';

const ForecastDay = ({ dayForecast, dayNum, shipDays, minHighTemp, minLowTemp, maxTemp, daysBefore, daysAfter }) => {  
  
    const highClass = dayForecast.temp.max < minHighTemp || dayForecast.temp.max > maxTemp ? "high alert-day" : "high";
    const lowClass = dayForecast.temp.min < minLowTemp ? "low alert-day" : "low";
    let dayClass = "forecast-day";
  
    if (((shipDays - daysBefore) <= (dayNum)) 
        && ((dayNum) <= (parseInt(shipDays) + parseInt(daysAfter)))) { 
      dayClass = "forecast-day arriving-threshold";
    }
    
    if (dayNum === shipDays) {dayClass = "forecast-day arriving";}
    
    return(
      <div className={dayClass} key={dayNum}>
        <p>{moment().add(dayNum, 'd').format('ddd')}</p>
        <WeatherIcon desc={dayForecast.weather[0].main}/>       
        <div className="temps">
          <div className={highClass}>
            {Math.round(dayForecast.temp.max)}
          </div>
          <div className={lowClass}>
            {Math.round(dayForecast.temp.min)}
          </div>        
        </div> 
      </div>
    )
  }

  export default ForecastDay;