import React from 'react';
import { NavLink } from "react-router-dom";


const NavBar = ({ user, handleLogout }) => {
  return (

    <nav>
      
      {/* <ul> */}

        {user ?
          <>
            {/* <header className="header"> */}
              <img
                src='../../../images/logo-img.png'
                style={{ width: "85px", height: "85px" }}
                className="logo-img"
                alt="logo"
              />
              <h1 className="logo">hoop'n</h1>
              <img
                src='../../../images/menu.svg'
                style={{ width: "50px", height: "50px" }}
                className="menu-img"
                alt="menu"
              />
            {/* </header> */}
            <li>Welcome, {user.name}</li>
            <li><NavLink to="/users">Users</NavLink></li>
            <NavLink to="" onClick={handleLogout}>LOG OUT</NavLink>
          </>
          :
          <>
            {/* <header className="header"> */}
              <img
                src='../../../images/logo-img.png'
                style={{ width: "85px", height: "85px" }}
                className="logo-img"
                alt="logo"
              />
              
            {/* </header> */}
            <li><NavLink to="/login">Log In</NavLink></li>
            {user && <li><NavLink to="/users">Users</NavLink></li>}
            <li><NavLink to="/signup">Sign Up</NavLink></li>
          </>
        }
      {/* </ul> */}
    </nav>
  )
}

export default NavBar;
