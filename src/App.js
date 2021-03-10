import React  from 'react';
import axios from 'axios';
// import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { Link } from 'react-scroll'
import Footer from './components/footer';
import Input from './components/common/input';
import Button from './components/common/button';
import Checkbox from './components/common/checkbox';
import RangeSlider from './components/common/rangeSlider';
import ForecastRow from './components/forecastRow';
import {  BiSlider  } from "react-icons/bi";
import {  RiRefreshLine } from "react-icons/ri"
import {  MdClear  } from "react-icons/md";


import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
// import {dealerJSON} from './dealers.js';
import {isWeatherAlert} from './services/forecastService';
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

class App extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        dealers: [
           {
            "id": 63,
            "name": "Mass St. Music",
            "city": "Lawrence",
            "state": "KS",
            "shipDays": 2,
            "country": "United States",
            "lat": 38.9582919,
            "lon": -95.236176
          },
          {
            "id": 62,
            "name": "Chicago Music Exchange",
            "city": "Chicago",
            "state": "IL",
            "shipDays": 2,
            "country": "United States",
            "lat": 41.9420522,
            "lon": -87.6705805
          },
          {
            "id": 65,
            "name": "Elderly Instruments",
            "city": "Lansing",
            "state": "MI",
            "shipDays": 3,
            "country": "United States",
            "lat": 42.74628,
            "lon": -84.5516499
          },
          {
            "id": 64,
            "name": "The Music Emporium",
            "city": "Lexington",
            "state": "MA",
            "shipDays": 3,
            "country": "United States",
            "lat": 42.4262892,
            "lon": -71.1956382
          }
        ],
        // dealers: dealerJSON,
        // dealers:[],
        isLoading: true,
        forecasts: [],
        filter:'',
        minHighTemp: 32,
        minLowTemp: 24,
        daysBefore: 1,
        daysAfter: 1,
        maxTemp: 90,
        showAlertsOnly: false,
        showIntlDealers: false,
        expandSettings: false
      };
    }

    async componentDidMount(){
        this.fetchWeatherAll();
    }
  
  
    fetchWeather = (dealer) => {
      let url =
        `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=${dealer.lat}&lon=${dealer.lon}&exclude=hourly,minutely&appid=${apiKey}`;
        return axios.get(url);
    };

    fetchWeatherAll = async () =>{
        // const url =
        // `http://localhost:5000/api/forecasts`;
        const url = process.env.REACT_APP_WEATHER_API_URL;
        // console.log(url);
        const {data: forecasts} = await axios.get(url);
        // console.log(forecasts);
        this.setState({forecasts, isLoading: false});
    }
  
    // fetchWeatherAll = async () => {
    //   console.log('set loading to true')
    //   this.setState({isLoading: true});
    //   let promises = [];
    //   let { dealers } = this.state;
    //   if (!this.state.showIntlDealers){
    //     dealers = dealers.filter((forecast)=>forecast.country === "United States");
    //     // alertDealers = alertDealers.filter((forecast)=> forecast.country === "United States");
    //   }  
  
    //   dealers.forEach((dealer) => {
    //     promises.push(
    //       this.fetchWeather(dealer)
    //     );
    //   });
      
    //   try{
    //     const data = await Promise.all(promises);
  
    //     const forecasts = data.map((item,idx) => {
    //       item.data.dealer = dealers[idx].name
    //       item.data.shipDays = dealers[idx].shipDays;
    //       item.data.country = dealers[idx].country;
    //       item.data.city = dealers[idx].city;
    //       item.data.state = dealers[idx].state;
    //       return item.data;
    //     });
    //     console.log('set loading to false')    
    //     this.setState({ forecasts, isLoading: false });
    //   } catch(err){
    //     console.log(err);
    //   }
    // };
  
    handleClick = () => {  
      this.fetchWeatherAll();
    };
    
     toggleSettings = () => {  
      this.setState({expandSettings: !this.state.expandSettings});
    };
    
    handleAlertClick = (e) => {  
      this.setState({filter: e.target.textContent})
    };  
    
    handleClearFilter = (query) =>{  
      this.setState({ filter: '' })
    };
    
    handleFilter = (query) => {  
      this.setState({ filter: query })
    };
    
    handleRangeSliderChange = (value, stateProp) => {  
      this.setState({ [stateProp]: value })
    };
   
    handleCheckboxClick = (stateProp) => {  
      console.log('check clicked')
      this.setState({ [stateProp]: !this.state[stateProp] })
    };
  
    render() {
      const { forecasts, filter, minHighTemp, minLowTemp, maxTemp, daysBefore, daysAfter, showAlertsOnly, showIntlDealers, isLoading, expandSettings } = this.state;
      let filtered = [...forecasts].sort((a, b) => (a.dealer > b.dealer) ? 1 : -1)
      
      if (filter){
        filtered = filtered.filter((forecast)=>forecast.dealer.toLowerCase().includes(filter.toLowerCase()));
      }
      if (showAlertsOnly){
        filtered = filtered.filter((forecast)=>isWeatherAlert(forecast, minHighTemp, minLowTemp, maxTemp, daysBefore, daysAfter))
      }
       
      let alertDealers = forecasts.sort((a, b) => (a.dealer > b.dealer) ? 1 : -1)
        .filter(forecast => isWeatherAlert(forecast, minHighTemp, minLowTemp, maxTemp, daysBefore, daysAfter));
  
      if (!showIntlDealers){
        filtered = filtered.filter((forecast)=>forecast.country === "United States");
        alertDealers = alertDealers.filter((forecast)=> forecast.country === "United States");
      }  
      
      return (
        <React.Fragment>
        <div className="container-sm">
          <section id="header">
            <h1>Weather Report</h1>
            <div className="button-container">
              <Button 
                onClick={this.toggleSettings} 
                style={isLoading ? "btn btn-primary loading" : "btn btn-primary" }
                label={<BiSlider size={25} />}
                id="toggle-settings"
              />
              <Button 
                onClick={this.handleClick} 
                style={isLoading ? "btn btn-primary loading" : "btn btn-primary" }
                label={<RiRefreshLine size={35}/>}
                id="refresh"
              />  
            </div>
          </section>
          <section id="settings">
            
            <div id="search-filter" className="collapse">
              <Input 
                value={filter} 
                onChange={this.handleFilter} 
                id="search-box"
                label="Filter by Dealer Name"
              />
              {
                filter.length>0 && (
                <Button 
                  onClick={this.handleClearFilter} 
                  label={<MdClear size={25}/>}
                  id="clear-dealer-filter"
                  
                />
                )
              }
        
            </div>
            <div id="settings-collapse" className={ expandSettings ? "" : "hide"}>
            <div className="row">
              <div className="col-sm-8">
                <RangeSlider 
                  label="Min High Temp"
                  value={minHighTemp} 
                  onChange={this.handleRangeSliderChange}
                  stateProp="minHighTemp"
                  min={0}
                  max={100}
                  units="&deg;"            
                />
                <RangeSlider 
                  label="Min Low Temp"
                  value={minLowTemp} 
                  onChange={this.handleRangeSliderChange}
                  stateProp="minLowTemp"
                  min={0}
                  max={100}
                  units="&deg;"              
                  />    
                <RangeSlider 
                  label="Max High Temp"
                  value={this.state.maxTemp} 
                  onChange={this.handleRangeSliderChange}
                  stateProp="maxTemp"
                  min={0}
                  max={100}
                  units="&deg;"              
                /> 
                <RangeSlider 
                  label="Days Before"
                  value={daysBefore} 
                  onChange={this.handleRangeSliderChange}
                  stateProp="daysBefore"
                  min={0}
                  max={4}           
                />
                <RangeSlider 
                  label="Days After"
                  value={daysAfter} 
                  onChange={this.handleRangeSliderChange}
                  stateProp="daysAfter"
                  min={0}
                  max={4}            
                />
              </div>
              <div className="col-sm-4">
                
                <Checkbox 
                  stateProp="showAlertsOnly"
                  onChange={this.handleCheckboxClick}
                  label="Show Alerts Only"
                  value={showAlertsOnly}
                  id="show-alerts-only"
                />
                <Checkbox 
                  stateProp="showIntlDealers"
                  onChange={this.handleCheckboxClick}
                  label="Show Intl Dealers"
                  value={showIntlDealers}
                  id="show-intl-dealers"
                />   
  
              </div>
            </div>  
            
                   
            </div>         
          </section>
          { (alertDealers.length > 0 || filtered[0] === filter) && (
            <section id="weather-alerts">
            
            <h4>Today's Alerts</h4>
            <ul>
              {
                alertDealers && alertDealers.map((dealer,idx) => (
                
                  <li  key={idx.toString()}
                    className={dealer.dealer === filter ? "selected" : ""}
                  >
                      <Link smooth={true} duration={200} to="forecasts" onClick={this.handleAlertClick}>
                      <span>{dealer.dealer}</span>
                      </Link></li>
                ))
              }
            </ul>
          </section>
          )}
          
          <section id="forecasts">
            {filtered &&
              filtered.map((dealer, idx) => (
              <ForecastRow 
                forecast={dealer} 
                idx={idx} 
                minHighTemp={minHighTemp}
                minLowTemp={minLowTemp}
                maxTemp={maxTemp}
                daysBefore={daysBefore}
                daysAfter={daysAfter}
                key={idx.toString()}
              />
              ))
            }
          </section> 
          
          
        </div>
        <Footer />
        </React.Fragment>
      );
    }
  }


export default App;
