import { Link } from "react-router-dom";
import NavMovies from "../NavMovies/NavMovies";
import "./Navigation.css";

function Navigation() {

  return (
    <nav className="navigation">
      {/* <div className="navigation__movies">
        <Link to="/movies" className="navigation__movies-link">Фильмы</Link>
        <Link to="/saved-movies" className="navigation__movies-link">
          Сохранённые фильмы
        </Link>
      </div> */}
      <NavMovies />
      <div>
      </div>
      <div className="navigation__auth">
        <Link to="/signup" className="navigation__link">Регистрация</Link>
        <Link to="/signin">
          <button className="navigation__button">
            Войти
          </button>
        </Link>
        <Link to="/profile">
          <button className="navigation__button_account">
            Аккаунт
          </button>
        </Link>
      </div>
      <button className='burger__button' />
    </nav>
  )
};

export default Navigation;