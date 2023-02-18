import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";
import logo from "../../images/header-logo.svg";

function Header({ loggedIn }) {
  return (
    <header className="header">
      <div className="header__logo-container">
      <Link to="/">
        <img
          src={logo}
          alt="Логотип"
          className="header__logo"
        />
      </Link>
      </div>
      <Navigation loggedIn={loggedIn} />
    </header>
  )
};

export default Header;