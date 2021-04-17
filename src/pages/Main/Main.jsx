import React, { useState, useEffect } from "react";
import {router} from "react-router-dom"
import { NavLink, Link } from "react-router-dom";
import './Main.css'


function Main(props)
{
    
   

    return(

        <>
        <Link className="MainLink" to="/">Find Courts Near You</Link>
        <br></br>

        <Link className="MainLink" to="/" >Upcoming Pickup Games</Link>
        <br></br>
        <Link className="MainLink" to="/">Create Pickup game</Link>
        
        </>

    )
}


export default Main;