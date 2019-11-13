import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Moment from "react-moment";
import SampleData from "./SampleData.json";

import {
  faBolt,
  faCloud,
  faCloudMoon,
  faCloudMoonRain,
  faCloudSun,
  faCloudSunRain,
  faCloudShowersHeavy,
  faSun,
  faMoon,
  faSnowflake,
  faWind,
  faTint,
  faSmog
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  const [weather, setWeather] = useState();

  const weatherIcons = {
    "clear-day": faSun,
    "clear-night": faMoon,
    cloudy: faCloud,
    "partly-cloudy-day": faCloudSun,
    "partly-cloudy-night": faCloudMoon,
    rain: faCloudShowersHeavy,
    wind: faWind,
    fog: faSmog
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = () => {
    //This function would normally call the API
    //so sample data is being used instead
    //
    //const API = 'Backend API would go here'
    //axios.get(API)
    //            .then(res => {
    //             console.log(res)
    //             var data = res.data
    var data = SampleData;
    setWeather(data);
    //            })
    //            .catch(err => {
    //                console.log(err)
    //            })
  };

  return (
    <div className="App" style={bodyStyle}>
      <div style={centerStyle}>
        {weather !== undefined && (
          <React.Fragment>
            <div>
              <div style={titleStyle}>
                <h2 style={{ marginBottom: "0" }}>Austin</h2>
                <h1 style={{ fontSize: "80px", margin: 0 }}>
                  &nbsp;{Math.round(weather.currently.temperature)}&deg;
                </h1>
              </div>
            </div>
            {weather.daily.data.map((d, i) =>
              i === 0 ? (
                <>
                  <div style={flexStyle}>
                    <div style={firstDayStyle}>
                      <Moment
                        style={inlineStyle}
                        date={d.time * 1000}
                        format="dddd"
                      />
                      &nbsp;<h5 style={h5Style}>TODAY</h5>
                    </div>
                    <div style={rightStyle}>
                      <div style={temp}>
                        <b>{Math.round(d.temperatureHigh)}&deg;</b>
                      </div>
                      <div style={temp}>
                        {Math.round(d.temperatureLow)}&deg;
                      </div>
                    </div>
                  </div>
                  <div style={hourlyDiv}>
                    {weather.hourly.data.map(
                      (d, i) =>
                        i <= 12 && (
                          <div key={`hourly-div-${i}`} style={hourlyStyle}>
                            {i === 0 ? (
                              <b>Now</b>
                            ) : (
                              <Moment date={d.time * 1000} format="h A" />
                            )}
                            <br />
                            <p className={d.icon}>
                              <FontAwesomeIcon icon={weatherIcons[d.icon]} />
                            </p>
                            {i === 0 ? (
                              <b>&nbsp;{Math.round(d.temperature)}&deg;</b>
                            ) : (
                              <>&nbsp;{Math.round(d.temperature)}&deg;</>
                            )}
                          </div>
                        )
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div style={flexStyle}>
                    <div style={dayStyle}>
                      <Moment
                        style={inlineStyle}
                        date={d.time * 1000}
                        format="dddd"
                      />
                    </div>
                    <div style={iconStyle}>
                      <FontAwesomeIcon icon={weatherIcons[d.icon]} />
                    </div>
                    <div style={rightStyle}>
                      <div style={temp}>
                        <b>{Math.round(d.temperatureHigh)}&deg;</b>
                      </div>
                      <div style={temp}>
                        {Math.round(d.temperatureLow)}&deg;
                      </div>
                    </div>
                  </div>
                </>
              )
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

const bodyStyle = {
  fontFamily: "Courier New"
};

const centerStyle = {
  margin: "auto"
};

const flexStyle = {
  margin: "auto",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
  display: "flex",
  alignItems: "center",
  minWidth: "300px",
  maxWidth: "390px",
  justifyContent: "space-between"
};

const titleStyle = {
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
  textAlign: "center"
};

const firstDayStyle = {
  width: "12rem",
  paddingLeft: "1rem"
};

const dayStyle = {
  width: "7rem",
  paddingLeft: "1rem"
};

const inlineStyle = {
  display: "inline-block"
};

const h5Style = {
  display: "inline-block",
  margin: 0
};

const iconStyle = {
  width: "8rem",
  textAlign: "center"
};

const rightStyle = {
  justifySelf: "end"
};

const temp = {
  width: "3.5rem",
  display: "inline-block",
  textAlign: "center"
};

const hourlyDiv = {
  borderTop: "1px solid gray",
  borderBottom: "1px solid gray",
  margin: "auto",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
  minWidth: "300px",
  maxWidth: "390px",
  overflow: "auto",
  whiteSpace: "nowrap"
};

const hourlyStyle = {
  textAlign: "center",
  display: "inline-block",
  height: "4rem",
  width: "4rem"
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
