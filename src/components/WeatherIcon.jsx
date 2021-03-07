
import {  WiRain, WiCloudy, WiDaySunny  } from "react-icons/wi";

const WeatherIcon = ({desc}) => {
    switch(desc) {
      case "Rain":
         return <WiRain size={35}/>
      case "Clear":
         return <WiDaySunny size={35}/>
      case "Clouds":
         return <WiCloudy size={35}/>
      case "Snow":
        return <ion-icon name="snow-outline" class="snowflake-icon"></ion-icon>
        // return <FaRegSnowflake size={19} className="snowflake-icon"/>
    } 
  }   

  export default WeatherIcon;