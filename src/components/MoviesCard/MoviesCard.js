import "./MoviesCard.css";
import React, { useState, useEffect } from 'react';
import { convertMinToHours } from '../../utils/utils';
import useScreenWidth from '../../hooks/useScreenWidth';

function MoviesCard({
    isSavedMoviesPage,
    movie,
    onSave,
    onDelete,
    saved
}) {
    const screenWidth = useScreenWidth();
    const [isMobile, setIsMobile] = useState(false);

    const handleSaveCard = () => {
        onSave(movie);
    };

    const handleDeleteCard = () => {
        onDelete(movie);
    };

    useEffect(() => {
        if (screenWidth < 786) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, [screenWidth]);

    const cardButtonClassName = `card__button ${saved ? "card__button_saved" : ""}`;

    return (
        <div className="card">
            <div className="card__description">
                <span className="card__name">{movie.nameRU}</span>
                <span className="card__duration">{convertMinToHours(movie.duration)}</span>
            </div>

            {isSavedMoviesPage ? (
                <button className='card__button_delete' type='button' onClick={handleDeleteCard} />
            ) : (
                <button
                    className={cardButtonClassName}
                    type='button'
                    onClick={handleSaveCard} />
            )}

            <a href={movie.trailerLink}
                className="card__link" target="_blank" rel="noopener noreferrer">
                <img src={isSavedMoviesPage ?
                    movie.image :
                    `https://api.nomoreparties.co/${movie.image.url}`
                }
                    alt={`Обложка фильма: ${movie.nameRU}`} className="card__image" /></a>
        </div >
    )
};

export default MoviesCard;