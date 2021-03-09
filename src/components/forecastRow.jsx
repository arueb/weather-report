import ForecastDay from './forecastDay';
import {isWeatherAlert} from '../services/forecastService';

const ForecastRow = ( { idx, forecast, minHighTemp, minLowTemp, maxTemp, daysBefore, daysAfter } ) => {

    const classList = isWeatherAlert(forecast, minHighTemp, minLowTemp, maxTemp, daysBefore, daysAfter) ? "forecast-row weather-alert" : "forecast-row"
    
    return(
      <div key={idx} className={classList} >
        <div className="dealer-name">{forecast.dealer}
          <div className="location">{forecast.city}, {forecast.state}</div>
        </div>
        {
          forecast.daily.map((dayForecast, idx)=>(
            <ForecastDay   
              dayForecast={dayForecast} 
              dayNum={idx} 
              shipDays={forecast.shipDays} 
              minHighTemp={minHighTemp} 
              minLowTemp={minLowTemp}
              maxTemp={maxTemp}
              daysBefore = {daysBefore}
              daysAfter = {daysAfter}
            />
  
          ))
        }
      </div>
    )
  }

  export default ForecastRow;