import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import './Navigation.css';

// компонент принимает пропс loggedIn, от него зависит вид шапки сайта

function Navigation({ loggedIn }) {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  // переключатель гамбургерного меню

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }

  // получаем путь

  const location = useLocation().pathname;

  return (
    <nav className="navigation">
      <div className="navigation__user-auth">
        {(location === "/" && !loggedIn) ?
          <>
            <Link to="/signup" className="navigation__register-link">Регистрация</Link>
            <Link to="/signin"><button className="navigation__login-button">Войти</button></Link>
          </> : ""}
        {loggedIn ?
          <Link to="/profile">
            <button className="navigation__account-button">Аккаунт<div className="navigation__account-icon"></div></button>
          </Link> : ""}
      </div>
      {loggedIn ?
        <button className="burger-menu__open-button" onClick={toggleBurgerMenu} /> : ""}
      {isBurgerMenuOpen && <BurgerMenu onClose={toggleBurgerMenu} />}
    </nav>
  )
};


export default Navigation;