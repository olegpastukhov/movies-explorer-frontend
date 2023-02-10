import { Link } from "react-router-dom";
import "./NavMovies.css";

function NavMovies() {
    return (
        <div className="nav-movies">
            <Link to="/movies" className="nav-movies__link">Фильмы</Link>
            <Link to="/saved-movies" className="nav-movies__link">
                Сохранённые&nbsp;фильмы
            </Link>
        </div>
    )
}

export default NavMovies;

