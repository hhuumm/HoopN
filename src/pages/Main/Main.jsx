import React, { useState, useEffect } from "react";
import { router } from "react-router-dom"
import { Link } from "react-router-dom";
import './Main.css'


function Main(props) {

    return (
        <>
        <div className="main-page" >
            <Link className="button" to="/">Find Courts Near You</Link>
            {/* <br></br> */}
            <Link className="button" to="/" >Upcoming Pickup Games</Link>
            {/* <br></br> */}
            <Link className="button" to="/">Create Pickup game</Link>
        </div>    
        </>
    )
}

export default Main;