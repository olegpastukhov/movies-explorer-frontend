import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import "./Navigation.css";

function Navigation({ loggedIn }) {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const location = useLocation().pathname;

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }

  return (
    <nav className='navigation'>
      {loggedIn ? (
        <>
          <div className='navigation__movies'>
            <Link
              to='/movies'
              className={location === '/movies' ? 'navigation__movies-link_active' : 'navigation__movies-link'}>
              Фильмы
            </Link>
            <Link
              to='/saved-movies'
              className={location === '/saved-movies' ? 'navigation__movies-link_active' : 'navigation__movies-link'}>
              Сохранённые фильмы
            </Link>
          </div>
          <div>
            <Link to='/profile'>
              <button className='navigation__button_account'>
                Аккаунт
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className='navigation__auth'>
          <Link to='/signup' className='navigation__link'>Регистрация</Link>
          <Link to='/signin'>
            <button className='navigation__button'>
              Войти
            </button>
          </Link>
        </div>
      )}
      {!isBurgerMenuOpen && loggedIn ? (
        <button
          className='burger__button'
          onClick={toggleBurgerMenu}
        />
      ) : loggedIn && <BurgerMenu onClose={toggleBurgerMenu} />
      }
    </nav>
  )
};


export default Navigation;