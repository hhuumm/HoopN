import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import './Main.css'


function Main(props)
{

    return(

        <>
        <Link>Find Courts Near You</Link>
        <br></br>

        <Link>Upcoming Pickup Games</Link>
        <br></br>
        <Link>Create Pickup game</Link>
        
        </>

    )
}


export default Main;