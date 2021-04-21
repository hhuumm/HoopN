import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Landing.css'

function Landing(props) {

    return (
        <>
            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://i.ibb.co/3CqX4Sq/slider1.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <div className="slider-text"><h3>Welcome to hoop'n!</h3></div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://i.ibb.co/RzwWrjz/slider2.jpg"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <div className="slider-text"><h3> Find courts near you</h3></div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://i.ibb.co/G2vNyj5/slider3.jpg"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <div className="slider-text"><h3>Pickup game events</h3></div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            { !props.user ? <NavLink className="button main-login-btn" to="/login">Log In</NavLink> : ''}
        </>
    )
}

export default Landing;