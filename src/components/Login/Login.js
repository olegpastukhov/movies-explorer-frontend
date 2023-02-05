import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/header-logo.svg";


function Login(){
    return (
        <div className="login__container">
            <div className="login__header">
                <Link to="/">
                    <img src={logo} alt="Логотип" className="login__logo" />
                </Link>
                <h1 className="login__title">Рады видеть!</h1>
            </div>

            <form className="login__form form" >
                <label className="login__label" htmlFor="email">E-mail</label>
                <input
                    className="login__input"
                    type="email"
                    id="email"
                    name="email"
                    required
                    value=""
                    readOnly
                />
                <span className="login__error">Демо ошибки</span>
                <label className="login__label" htmlFor="password">Пароль</label>
                <input
                    className="login__input"
                    type="password"
                    id="password"
                    name="password"
                    required
                    value=""
                    readOnly
                />
                <span className="login__error">Демо ошибки</span>
                <button className="login__button" type="submit" disabled="">Войти</button>
            </form>
            <div className="login__bottom">
                <span>Ещё не зарегистрированы?</span>
                <Link to="/signup" className="login__link">Регистрация</Link>
            </div>
        </div>
    )
};

export default Login;