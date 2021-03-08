
import {  WiRain, WiCloudy, WiDaySunny  } from "react-icons/wi";
import {  IoIosSnow  } from "react-icons/io";

const WeatherIcon = ({desc}) => {
    switch(desc) {
      case "Rain":
         return <WiRain size={35}/>
      case "Clear":
         return <WiDaySunny size={35}/>
      case "Clouds":
         return <WiCloudy size={35}/>
    case "Snow":
        return <IoIosSnow size={35}/>
    default:
        return;
    } 
  }   

  export default WeatherIcon;