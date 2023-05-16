import React from 'react';
import './MoviesCard.css';

// импортируем адрес сервера

import { MOVIES_SERVER } from '../../utils/constants.js';

function MoviesCard({ onSave, onDelete, movie, isSavedMovie, isSavedMoviesPage }) {

    // для удобства сохраняем в переменную класс карточки

    const cardButtonClassName = `movie-card__button ${isSavedMovie ? "movie-card__button_saved" : ""}`

    // и возвращаем разметку

    return (
        <div className="movie-card">
            <div className="movie-card__text">
                <p className="movie-card__title">{movie.nameRU}</p>
                <p className="movie-card__duration">{movie.duration + " мин"}</p>
            </div>
            {isSavedMoviesPage ? (
                <button className="movie-card__delete-button" type="button" onClick={() => onDelete(movie)} />
            ) : (
                <button className={cardButtonClassName} type="button" onClick={() => onSave(movie)} />
            )}
            <a href={movie.trailerLink}
                className="movie-card____link" target="_blank" rel="noopener noreferrer">
                <img
                    src={isSavedMoviesPage ? movie.image : `${MOVIES_SERVER + movie.image.url}`}
                    alt={`Обложка фильма: ${movie.nameRU}`}
                    className="movie-card__cover"
                />
            </a>
        </div>
    )
};

export default MoviesCard;