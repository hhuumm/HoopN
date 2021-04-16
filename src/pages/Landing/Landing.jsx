import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import './Landing.css'

function Landing({ user, handleLogout }) {

    return (
        <>
            <h1>Latitude Longitude</h1>


            {user ?
                <>                    
                    <h2>Welcome, {user}</h2>
                    <NavLink to="" onClick={handleLogout}>LOG OUT</NavLink>
                </>
                :
                <>
                    <NavLink to="/login">Log In</NavLink>
                </>}
        </>
    )
}

export default Landing;