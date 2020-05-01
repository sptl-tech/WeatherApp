import React, { useState } from 'react';
//utilizes api from openweathermap.org 
const api ={
  key : "14b09015307faec1135c77dddf821b09",
  base: "https://api.openweathermap.org/data/2.5/"

}

function App() {
  const[query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  //function to get weather using fetch get request to retieve 
  //weather, query, imperial units, appID from API 
  const search = evt =>{
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('');
          setWeather(result);
          console.log(result);
        })

    }
  }

  //dateBuilder const to give us the current month and dat
  const dateBuilder =(d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()]; //returns an index from 0-6 for day
    let date = d.getDate(); 
    let month = months[d.getMonth()]; // returns index from 0-11 to represent month
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return ( 
    //if weather is greater than 68 degrees Farenheight, use warm class, else cold class
    <div className={(typeof weather.main != "undefined")
      ? ((weather.main.temp > 68) 
        ? 'app warm' 
        : 'app')
      : 'app'}> 

      
      <main>
        <div className = "search-box">
          <input 
          type ="text"
          className ="search-bar"
          placeholder ="Search..."
          onChange={e => setQuery(e.target.value)}
          value ={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div> 
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
        <div className ="weather-box">
          <div className ="temp">
            {Math.round(weather.main.temp)}°F
          </div>
          <div className ="weather">{weather.weather[0].main}</div> 
        </div>
      </div>
        ) : ('') }
        
      </main>
    </div>
  );
}

export default App;
