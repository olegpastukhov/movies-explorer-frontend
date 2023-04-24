import React from 'react';
import "./MoviesCard.css";
import movie_photo from "../../images/movie_example.jpg";
import { useLocation } from 'react-router-dom';

function MoviesCard({ isSaved }) {
    const location = useLocation().pathname;
    return (
        <div className="movie-card">
            <div className="movie-card__text">
                <p className="movie-card__title">Русское название</p>
                <p className="movie-card__duration">Продолжительность</p>
            </div>
            {(isSaved && location !== '/saved-movies') ? <button type="button" className="movie-card__button movie-card__button_saved" /> :
                <button type="button" className="movie-card__button" />}
            {(location === '/saved-movies') && <button type="button" className="movie-card__delete-button" />}
            <a href="https://www.youtube.com/watch?v=5ovzC93EneA"
                className="movie-card____link" target="_blank" rel="noopener noreferrer"><img src={movie_photo} alt="Обложка фильма" className="movie-card__cover" /></a>
        </div>
    )
};

export default MoviesCard;