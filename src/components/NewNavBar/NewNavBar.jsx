/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./NewNavBar.css";
import { CSSTransition } from "react-transition-group";

const NewNavBar = ({ user, handleLogout }) => {
// export default function Header() {
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

  return (
    <header className="Header">
      <div className="nav-logo">
        <img
          src='../../../images/logo-img.png'
          // style={{ width: "85px", height: "85px" }}
          className="Logo"
          alt="hoop'n"
        />
        <h1 className="logo-text" fontSize="80px" font-size="80px">hoop'n</h1>
      </div>
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          {user ? <span>{user.name}</span> : 'not logged' }
          <a href="/">Home</a>
          <a href="/">Articles</a>
          <a href="/">About</a>
          {/* <button>Logout</button> */}
          <NavLink to="/" onClick={handleLogout}>LOG OUT</NavLink>
        </nav>
      </CSSTransition>
      {user ?
          <>
      <button onClick={toggleNav} className="Burger">
        <img src="https://i.ibb.co/ZdyrMTz/menu.png" width="50px" height="auto"></img>
      </button>
      </>
      :
      <>
      {/* not logged in */}
      </>}
    </header>
    
  );
}

export default NewNavBar;

