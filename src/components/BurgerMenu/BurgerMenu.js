import React from 'react';
import './BurgerMenu.css';
import { NavLink, Link } from 'react-router-dom';

// компонент принимает пропс onClose

function BurgerMenu({ onClose }) {
  return (
    <section className="burger-menu">
      <div className="burger-menu__overlay">
        <div className="burger-menu__content">
          <button type="button" className="burger-menu__close-button" onClick={onClose} />
          <ul className="burger-menu__items">
            <NavLink to="/" className={({ isActive }) => isActive ? "burger-menu-link_active" : "burger-menu-link"}>Главная </NavLink>
            <NavLink to="/movies" className={({ isActive }) => isActive ? "burger-menu-link_active" : "burger-menu-link"}>Фильмы</NavLink>
            <NavLink to="/saved-movies" className={({ isActive }) => isActive ? "burger-menu-link_active" : "burger-menu-link"}>Сохранённые фильмы</NavLink>
          </ul>
          <Link to="/profile">
            <button className="burger-menu__account-button">Аккаунт<div className="burger-menu__account-icon"></div></button>
          </Link>
        </div>
      </div>
    </section>
  )
};

export default BurgerMenu;