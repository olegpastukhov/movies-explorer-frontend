import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import "./Navigation.css";

function Navigation() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }

  const location = useLocation().pathname;

  return (
    <nav className="navigation">
      <div className="navigation__user-auth">
        {(location === '/') ?
          <>
            <Link to="/signup" className="navigation__register-link">Регистрация</Link>
            <Link to="/signin"><button className="navigation__login-button">Войти</button></Link>
          </> : ''}

        {(location === '/movies' | location === '/saved-movies' | location === '/profile') ?
          <Link to="/profile">
            <button className="navigation__account-button">Аккаунт<div className='navigation__account-icon'></div></button>
          </Link> : ''}
      </div>
      {(location === '/movies' | location === '/saved-movies' | location === '/profile') ?
        <button className='burger-menu__open-button' onClick={toggleBurgerMenu} /> : ''}
      {isBurgerMenuOpen && <BurgerMenu onClose={toggleBurgerMenu} />}
    </nav>
  )
};


export default Navigation;