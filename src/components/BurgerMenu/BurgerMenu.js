import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './BurgerMenu.css';

function BurgerMenu({ onClose }) {
  return (
    <div className='burger'>
      <div className='burger__backdrop'>
        <div className='burger__container'>
          <button type='button' className='burger__close-btn' onClick={() => onClose()} />
          <div className='burger__menu'>
            <NavLink to='/' className={({ isActive }) => isActive ? 'burger-link_active' : 'burger-link'}>
              Главная
            </NavLink>
            <NavLink to='/movies' className={({ isActive }) => isActive ? 'burger-link_active' : 'burger-link'}>
              Фильмы
            </NavLink>
            <NavLink to='/saved-movies' className={({ isActive }) => isActive ? 'burger-link_active' : 'burger-link'}>
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