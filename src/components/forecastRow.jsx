import ForecastDay from "./forecastDay";
import { isWeatherAlert, adjustedShipDays } from "../services/forecastService";

const ForecastRow = ({
  idx,
  forecast,
  minHighTemp,
  minLowTemp,
  maxTemp,
  daysBefore,
  daysAfter,
}) => {
  //   console.log(forecast.dealer);
  //   console.log("adjusted ship days:", adjustedShipDays(forecast.shipDays));
  const classList = isWeatherAlert(
    forecast,
    minHighTemp,
    minLowTemp,
    maxTemp,
    daysBefore,
    daysAfter
  )
    ? "forecast-row weather-alert"
    : "forecast-row";

  return (
    <div key={idx.toString()} className={classList}>
      <div className="dealer-name">
        {forecast.dealer}
        <div className="location">
          {forecast.city}, {forecast.state}
        </div>
      </div>
      {forecast.daily.map((dayForecast, idx) => (
        <ForecastDay
          dayForecast={dayForecast}
          dayNum={idx}
          shipDays={adjustedShipDays(forecast.shipDays)}
          minHighTemp={minHighTemp}
          minLowTemp={minLowTemp}
          maxTemp={maxTemp}
          daysBefore={daysBefore}
          daysAfter={daysAfter}
          key={idx.toString()}
        />
      ))}
    </div>
  );
};

export default ForecastRow;
