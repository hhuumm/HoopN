import React, { useState, useEffect } from "react";
import { router } from "react-router-dom"
import { Link } from "react-router-dom";
import './Main.css'


function Main(props) {
    const { weather, history, sunrise, sunset, windDirection, user } = props;
    const icons = null

    return (
        <>

            <div className="main-page">
                <h1>Welcome, {user.name}!</h1><br></br>
                <Link className="button" to="/locations">Find Parks Near Me</Link>
                {/* <br></br> */}
                <Link className="button" to="/events" >See Local Games</Link>
                {/* <br></br> */}
                <Link className="button" to="/events/add">Create a New Game</Link>
            </div>
            {weather ?
                <div className="weather-container">
                    <div className="main-page weather-div">
                        <span className="weather3">{weather.name}</span>

                        {weather.weather.map(weather =>
                            <span className="weather1">{weather.main}<br /><img className="weather-icon" src={"https://s3.gifyu.com/images/" + weather.icon + ".png"}></img>
                            </span>
                        )}

                        {/* {weather.weather.map(weather =>
                            <span className="weather2">{weather.main}</span>
                        )} */}

                        <span className="weather4">Min<br />{(weather.main.temp_min).toString().split('.').slice(0,1)}°F</span>
                        <span className="weather5">Max<br />{(weather.main.temp_max).toString().split('.').slice(0,1)}°F</span>
                        <span className="weather6">Now<br />{(weather.main.temp).toString().split('.').slice(0,1)}°F</span>
                        {/* <span className="weather-7">{windDirection}<br /><span className="weather-arrow">{(weather.wind.speed).toFixed(0)} mph</span></span> */}
                        <span className="weather7">Wind<br /><span className="weather-arrow">{windDirection}</span><br />{(weather.wind.speed).toFixed(0)} mph</span>
                        <div className="weather8div">
                            <span className="weather8">{(sunrise)}<br /><img className="weather8img" src="https://i.ibb.co/M8RQLTq/sunrise.png" alt="sunrise" width="60px" border="0"></img></span><br />
                            <span className="weather9">{sunset}<br /><img className="weather9img" src="https://i.ibb.co/k3MtTHc/sunset.png" alt="sunset" width="50px" border="0"></img></span>
                        </div>
                    </div>
                </div>
                :
                <div>
                    <img className="load-gif" className="load-gif" src="https://media.giphy.com/media/vZROLXfaqhbhHO8qwr/giphy.gif"></img>
                </div>
            }

        </>
    )
}

export default Main;
