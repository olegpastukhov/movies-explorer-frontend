import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Login.css';

// импортируем хук useForm

import useForm from '../../hooks/useForm';

// компонент принимает пропс onLogin из App

function Login({ onLogin }) {

    // берём необходимое из useForm

    const { handleValueChange, isValid, values, errors } = useForm();

    // обработчик отправки данных из формы

    const handleFormSubmit = (event) => {
        event.preventDefault(); // отменяем действие по умолчанию
        if (!values.email || !values.password) {
            return; // если не введен email или password - ничего не возвращаем
        }
        onLogin(values); // иначе передаём данные на обработчик из App
    };

    return (
        <section className="login">
            <div className="login__header">
                <Link to="/"><img src={logo} alt="Логотип сайта" className="login__logo" /></Link>
                <h1 className="login__heading">Рады видеть!</h1>
            </div>
            <form className="login__form form" onSubmit={handleFormSubmit}>
                <label className="login__label" htmlFor="email">E-mail</label>
                <input
                    className="login__input"
                    type="email"
                    name="email"
                    value={values.email || ""}
                    onChange={handleValueChange}
                    required
                />
                <span className="login__error">{errors.email}</span>
                <label className="login__label" htmlFor="password">Пароль</label>
                <input
                    className="login__input"
                    type="password"
                    name="password"
                    value={values.password || ""}
                    onChange={handleValueChange}
                    required
                />
                <span className="login__error">{errors.password}</span>
                <button className="login__button" type="submit" disabled={!isValid}>Войти</button>
            </form>
            <div className="login__bottom-field">
                <span>Ещё не зарегистрированы?</span>
                <Link to="/signup" className="login__link">Регистрация</Link>
            </div>
        </section>
    )
};

export default Login;