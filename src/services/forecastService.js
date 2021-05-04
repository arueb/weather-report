import moment from "moment";

export function adjustedShipDays(shipDays) {
  const today = moment();
  const todayDow = today.day();
  const arrivalDow = today.add(shipDays, "d").day();

  if (arrivalDow < todayDow || arrivalDow === 6 || arrivalDow === 0) {
    return shipDays + 2;
  }

  return shipDays;
}

export function isWeatherAlert(
  forecast,
  minHighTemp,
  minLowTemp,
  maxTemp,
  daysBefore,
  daysAfter
) {
  // create the range of days to loop through to check dayforecast against settings
  const shipDays = adjustedShipDays(forecast.shipDays);
  let startDayIndex = shipDays - daysBefore;
  let endDayIndex = parseInt(shipDays) + parseInt(daysAfter);
  if (startDayIndex < 0) startDayIndex = 0;
  if (endDayIndex > 7) endDayIndex = 7;

  let highTemp, lowTemp, alertMinHighTemp, alertMinLowTemp, alertHighTemp;
  let alertRow = false;

  let i = startDayIndex;
  while (i <= endDayIndex && !alertRow) {
    highTemp = forecast.daily[i].temp.max;
    lowTemp = forecast.daily[i].temp.min;
    alertMinHighTemp = highTemp < minHighTemp;
    alertMinLowTemp = lowTemp < minLowTemp;
    alertHighTemp = highTemp > maxTemp;
    alertRow = alertMinHighTemp || alertMinLowTemp || alertHighTemp;
    i++;
  }
  return alertRow;
}
