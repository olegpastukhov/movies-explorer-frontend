import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import NavMovies from "../NavMovies/NavMovies";
import "./Navigation.css";

function Navigation() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }

  const location = useLocation().pathname;

  return (
    <nav className="navigation">
      {/* <div className="navigation__movies">
        <Link to="/movies" className="navigation__movies-link">Фильмы</Link>
        <Link to="/saved-movies" className="navigation__movies-link">
          Сохранённые фильмы
        </Link>
      </div> */}
      {(location === '/movies' | location === '/saved-movies' | location === '/profile') ? <NavMovies /> : ''}
      <div>
      </div>
      <div className="navigation__auth">
        {(location === '/') ?
          <>
            <Link to="/signup" className="navigation__link">Регистрация</Link>
            <Link to="/signin">
              <button className="navigation__button">
                Войти
              </button>
            </Link>
          </> : ''}

        {(location === '/movies' | location === '/saved-movies' | location === '/profile') ?
          <Link to="/profile">
            <button className="navigation__button_account">
              Аккаунт
            </button>
          </Link> : ''}
      </div>
      {(location === '/movies' | location === '/saved-movies' | location === '/profile') ?
        <button className='burger__button' onClick={toggleBurgerMenu} /> : ''}
      {isBurgerMenuOpen && <BurgerMenu onClose={toggleBurgerMenu} />}
    </nav>
  )
};


export default Navigation;