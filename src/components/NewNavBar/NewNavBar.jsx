/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./NewNavBar.css";
import { CSSTransition } from "react-transition-group";

const NewNavBar = ({ user, handleLogout }) => {

  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  function logOutCloseNav() {
    toggleNav();
    handleLogout();
  }

  return (
    <header className="Header">
      <div className="nav-logo">
        <a href="/main">
          <img
            src='../../../images/logo-img.png'
            href="/main"
            className="Logo"
            alt="hoop'n"
          />
        </a>
        <a href="/main"><h1 className="logo-text" fontSize="80px" >hoop'n</h1></a>

      </div>
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          {user ?
            <>
              <a href="/main">Home</a>
              <a href="/events">Local Games</a>
              <a href="/myEvents">My Games</a>
              <NavLink onClick={logOutCloseNav} className="button login-btn" to="/">Logout</NavLink>
            </>
            :
            <>
              <NavLink className="button login-btn" to="/login">Log In</NavLink>
            </>
          }
        </nav>
      </CSSTransition>
      {user ?
        <>
          <button onClick={toggleNav} className="Burger">
            <img src="https://i.ibb.co/ZdyrMTz/menu.png" alt="|||" width="50px" height="auto"></img>
          </button>
        </>
        :
        <>
          {/* when user log out >> .Nav {visibility: hidden;}  ++responsive++ */}
          {/* <button onClick={toggleNav} className="Burger">
            <img src="https://i.ibb.co/ZdyrMTz/menu.png" width="50px" height="auto"></img>
          </button> */}
        </>}
    </header>

  );
}

export default NewNavBar;

