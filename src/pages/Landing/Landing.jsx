import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import './Landing.css'

function Landing(props) {
    console.log(props, 'props??')

    return (
        <>
            <h1>Latitude Longitude</h1>


            {props.user ?
                <>                    
                    <h2>Welcome, {props.user.name}</h2>
                    
                </>
                :
                <>
                    <NavLink className="button main-login-btn" to="/login">Log In</NavLink>
                </>}
        </>
    )
}

export default Landing;