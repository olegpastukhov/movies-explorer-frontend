import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/header-logo.svg";

function Register() {

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  return (
    <section className="register__container">
      <div className="register__header">
        <Link to="/">
          <img
            src={logo}
            alt="Логотип"
            className="register__logo"
          />
        </Link>

        <h1 className="register__title">Добро пожаловать!</h1>
      </div>

      <form className="register__form form">
        <label className="register__label" htmlFor="name">Имя</label>
        <input
          className="register__input"
          type="text"
          id="name"
          name="name"
          minLength={2}
          required
          value={name || ''}
          onChange={handleNameChange}
        />
        <span className="register__error">Демо ошибки</span>
        <label className="register__label" htmlFor="email">E-mail</label>
        <input
          className="register__input"
          type="email"
          id="email"
          name="email"
          required
          value={email || ''}
          onChange={handleEmailChange}
        />
        <span className="register__error">Демо ошибки</span>
        <label className="register__label" htmlFor="password">Пароль</label>
        <input
          className="register__input"
          type="password"
          id="password"
          name="password"
          minLength="8"
          required
          value={password || ''}
          onChange={handlePasswordChange}
        />
        <span className="register__error">Демо ошибки</span>
        <button className="register__button" type="submit" disabled="">Зарегистрироваться</button>
      </form>
      <div className="register__bottom">
        <span>Уже зарегистрированы?</span>
        <Link to="/signin" className="register__link">Войти</Link>
      </div>

    </section>
  )
};

export default Register;