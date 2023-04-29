import React from "react";
import "./Profile.css";
import Header from "../Header/Header";

function Profile() {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');

  function handleEmailChange(e) {
      setEmail(e.target.value);
  }

  function handleNameChange(e) {
      setName(e.target.value);
  }

  return (
    <>
    <Header />
    <section className="profile">
        <h1 className="profile__heading">Привет, Олег!</h1>
        <form className="profile___form">
          <div className="profile__field">
            <label className="profile__label">Имя</label>
            <input type="text" name="name" value={name || 'Олег'} className="profile__input" required onChange={handleNameChange}/>
          </div>
          <div className="profile__line"></div>
          <div className="profile__field">
            <label className="profile__label">E-mail</label>
            <input type="email" name="email" value={email || '123@12345.ru'} className="profile__input" required onChange={handleEmailChange}/>
          </div>
          <div className="profile__bottom-field">
            <button className="profile__edit" type="submit">Редактировать</button>
            <button className="profile__logout" type="button">Выйти из аккаунта</button>
          </div>
        </form>
    </section>
    </>
  )
};

export default Profile;