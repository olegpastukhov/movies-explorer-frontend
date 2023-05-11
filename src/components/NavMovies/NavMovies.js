import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavMovies.css';

// компонент не принимает пропсы, классы ссылок зависят от location

function NavMovies() {

    const location = useLocation().pathname;
    
    return (
        <nav className="nav-movies">
            <Link
                to="/movies"
                className={(location === "/movies") ? "nav-movies__link nav-movies__link_active" : "nav-movies__link"}>Фильмы</Link>
            <Link
                to="/saved-movies"
                className={(location === "/saved-movies") ? "nav-movies__link nav-movies__link_active" : "nav-movies__link"}>
                Сохранённые&nbsp;фильмы
            </Link>
        </nav>
    )
}

export default NavMovies;

