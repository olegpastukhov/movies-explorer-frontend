import React, { useContext, useEffect } from 'react';
import './Profile.css';
import Header from '../Header/Header';

// импортируем хук useForm

import useForm from '../../hooks/useForm';

// импортируем контекст пользователя

import CurrentUserContext from '../../contexts/CurrentUserContext';

// импортируем константу EMAIL_REGEXP для проверки валидности email

import { EMAIL_REGEXP } from '../../utils/constants.js';

// компонент принимает пропсы из App

function Profile({ loggedIn, onUpdateUserInfo, onSignOut }) {

  // получаем данные из глобального стейта

  const currentUserInfo = useContext(CurrentUserContext);

  // получаем всё необходимое через useForm

  const { values, handleValueChange, isValid, handleResetFormData } = useForm();

  // в логическую переменную записываем результат проверки, отличаются ли новые данные от уже сохранённых
  // и валидна ли форма редактирования данных

  const isNewValues = (!isValid || (currentUserInfo.name === values.name && currentUserInfo.email === values.email))

  // обработчик сабмита формы

  const handleFormSubmit = (evt) => {
    evt.preventDefault(); // отменяем действие по умолчанию
    onUpdateUserInfo({ name: values.name, email: values.email, }); // передаём новые данные дальше
  };

  // обработчик выхода из аккаунта

  const handleUserSignOut = () => { onSignOut() };

  // эффект обновления полей формы

  useEffect(() => {
    currentUserInfo ? handleResetFormData(currentUserInfo) : handleResetFormData();
  }, [currentUserInfo, handleResetFormData]);


  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h1 className="profile__heading">Привет, {currentUserInfo.name}!</h1>
        <form className="form profile___form" onSubmit={handleFormSubmit}>
          <div className="profile__field">
            <label className="profile__label">Имя</label>
            <input type="text" name="name" value={values.name || ""} className="profile__input" onChange={handleValueChange} required />
          </div>
          <div className="profile__line"></div>
          <div className="profile__field">
            <label className="profile__label">E-mail</label>
            <input type="email" name="email" value={values.email || ""} className="profile__input" required onChange={handleValueChange}
              pattern={EMAIL_REGEXP} />
          </div>
          <div className="profile__bottom-field">
            <button className="profile__edit-button" type="submit" disabled={isNewValues}>Редактировать</button>
            <button className="profile__logout-button" type="button" onClick={handleUserSignOut}>Выйти из аккаунта</button>
          </div>
        </form>
      </section>
    </>
  )
};

export default Profile;