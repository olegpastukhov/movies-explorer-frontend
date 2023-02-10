import "./MoviesCard.css";
import movie_photo from "../../images/movie_example.jpg";
import { useLocation } from 'react-router-dom';

function MoviesCard({ isSaved }) {
    const location = useLocation().pathname;
    return (
        <div className="card">
            <div className="card__description">
                <span className="card__name">Русское название</span>
                <span className="card__duration">Продолжительность</span>
            </div>
            {isSaved ? <button type="button" className="card__button card__button_saved" /> :
                <button type="button" className="card__button" />}
            {(location === '/saved-movies') && <button type="button" className="card__button card__button_delete" />}
            <a href="https://www.youtube.com/watch?v=5ovzC93EneA"
                className="card__link" target="_blank" rel="noreferrer"><img src={movie_photo} alt="Обложка фильма" className="card__image" /></a>
        </div>
    )
};

export default MoviesCard;