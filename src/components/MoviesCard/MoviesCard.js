import "./MoviesCard.css";
import movie_photo from "../../images/movie_example.jpg";

function MoviesCard() {
    return (
        <div className="card">
            <div className="card__description">
                <span className="card__name">Русское название</span>
                <span className="card__duration">Продолжительность</span>
            </div>
            <button type="button" className="card__button" />
            <button type="button" className="card__button_saved" />
            <button type="button" className="card__button_delete" />
            <a href="https://www.youtube.com/watch?v=5ovzC93EneA" 
            className="card__link" target="_blank" rel="noreferrer"><img src={movie_photo} alt="Обложка фильма" className="card__image" /></a>
        </div>
    )
};

export default MoviesCard;