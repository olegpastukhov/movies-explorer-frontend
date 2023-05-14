import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';

// импортируем хук useForm

import useForm from '../../hooks/useForm';

// импортируем константу EMAIL_REGEXP для проверки валидности email

import { EMAIL_REGEXP } from '../../utils/constants.js';

// компонет принимает пропс onRegister из App

function Register({ onRegister }) {

  // берём необходимое из useForm

  const { handleValueChange, isValid, values, errors } = useForm();

  // обработчик отправки данных формы

  const handleFormSubmit = (event) => {
    event.preventDefault(); // отменяем действие по умолчанию
    onRegister(values); // передаём данные на обработчик из App
  };

  return (
    <section className="register">
      <div className="register__header">
        <Link to="/"><img src={logo} alt="Логотип сайта" className="register__logo" /></Link>
        <h1 className="register__heading">Добро пожаловать!</h1>
      </div>
      <form className="register__form form" onSubmit={handleFormSubmit}>
        <label className="register__label" htmlFor="name">Имя</label>
        <input className="register__input" type="text" name="name" minLength={2} value={values.name || ""} onChange={handleValueChange} required />
        <span className="register__error">{errors.name}</span>
        <label className="register__label" htmlFor="email">E-mail</label>
        <input className="register__input" type="email" name="email" value={values.email || ""} onChange={handleValueChange} pattern={EMAIL_REGEXP} required />
        <span className="register__error">{errors.email}</span>
        <label className="register__label" htmlFor="password">Пароль</label>
        <input className="register__input" type="password" name="password" minLength="8" value={values.password || ""} onChange={handleValueChange} required />
        <span className="register__error">{errors.password}</span>
        <button className="register__button" type="submit" disabled={!isValid}>Зарегистрироваться</button>
      </form>
      <div className="register__bottom-field">
        <span>Уже зарегистрированы?</span>
        <Link to="/signin" className="register__link">Войти</Link>
      </div>
    </section>
  )
};

export default Register;