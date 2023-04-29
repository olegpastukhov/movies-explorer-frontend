import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Login.css";


function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    return (
        <section className="login">
            <div className="login__header">
                <Link to="/"><img src={logo} alt="Логотип сайта" className="login__logo" /></Link>
                <h1 className="login__heading">Рады видеть!</h1>
            </div>
            <form className="login__form form" >
                <label className="login__label" htmlFor="email">E-mail</label>
                <input
                    className="login__input"
                    type="email"
                    name="email"
                    required
                    value={email || ''}
                    onChange={handleEmailChange}
                />
                <span className="login__error">Демо ошибки</span>
                <label className="login__label" htmlFor="password">Пароль</label>
                <input
                    className="login__input"
                    type="password"
                    name="password"
                    required
                    value={password || ''}
                    onChange={handlePasswordChange}
                />
                <span className="login__error">Демо ошибки</span>
                <button className="login__button" type="submit" disabled="">Войти</button>
            </form>
            <div className="login__bottom-field">
                <span>Ещё не зарегистрированы?</span>
                <Link to="/signup" className="login__link">Регистрация</Link>
            </div>
        </section>
    )
};

export default Login;