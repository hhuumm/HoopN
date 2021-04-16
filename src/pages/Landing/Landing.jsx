import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import './Landing.css'

function Landing({ user }) {




    return (
        <>
            <h1>Latitude Longitude</h1>


            {user ?
                <>
                    {/* <button onClick={toggleNav} className="Burger"> */}
                        <img src="https://i.ibb.co/ZdyrMTz/menu.png" width="50px" height="auto"></img>
                    {/* </button> */}
                </>
                :
                <>
                    <NavLink to="/login">Log In</NavLink>
                </>}
        </>
    )
}

export default Landing;