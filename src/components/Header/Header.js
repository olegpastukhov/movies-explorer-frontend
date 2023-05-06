import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";
import NavMovies from "../NavMovies/NavMovies";
import "./Header.css";

// компонет принмает пропс loggedIn из Main

function Header({ loggedIn }) {
  const location = useLocation().pathname;

  return (
    <header className={(location === '/') ? 'header header_grey' : 'header'}>
      <div className="header__logo-container">
        <Link to="/"><img src={logo} alt="Логотип сайта" className="header__logo" /></Link>
      </div>
      {loggedIn ? <NavMovies /> : ''}
      <Navigation loggedIn={loggedIn} />
    </header>
  )
};

export default Header;