import React, { useState, useEffect } from "react";
import { router } from "react-router-dom"
import { Link } from "react-router-dom";
import './Main.css'


function Main(props) {
    const { weather, history } = props;
    const icons = null

    return (
        <>

            <div className="main-page">
                <Link className="button" to="/locations">Find Courts Near You</Link>
                {/* <br></br> */}
                <Link className="button" to="/events" >Upcoming Pickup Games</Link>
                {/* <br></br> */}
                <Link className="button" to="/events/add">Create Pickup game</Link>
            </div>
            {weather ?
                <div className="main-page">
                    <span>{weather.name}</span><br />
                    {weather.weather.map(weather =>
                    <span>
                        {weather.main}<br />
                        <img src={"http://openweathermap.org/img/w/" + weather.icon + ".png"}></img>
                    </span>
                    )}
                </div>
                :
                <div>
                    <img src="https://media.giphy.com/media/vZROLXfaqhbhHO8qwr/giphy.gif"></img>
                </div>
            }

        </>
    )
}

export default Main;
