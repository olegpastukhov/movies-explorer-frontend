import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './BurgerMenu.css';

function BurgerMenu() {
  return (
    <div className='burger'>
      <div className='burger__backdrop'>
        <div className='burger__container'>
          <button type='button' className='burger__close-btn' />
          <div className='burger__menu'>
            <NavLink to='/' className='burger-link burger-link_active'>
              Главная
            </NavLink>
            <NavLink to='/movies' className='burger-link'>
              Фильмы
            </NavLink>
            <NavLink to='/saved-movies' className='burger-link'>
              Сохранённые фильмы
            </NavLink>
          </div>
            <Link to='/profile'>
              <button className='burger__button_account'>Аккаунт</button>
            </Link>
        </div>
      </div>
    </div>
  )
};

export default BurgerMenu;