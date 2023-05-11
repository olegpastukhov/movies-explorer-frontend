import React from 'react';
import './Promo.css';

// компонент не принимает пропсы, не содержит логики

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__heading">Учебный проект студента факультета Веб-разработки.</h1>
      </div>
    </section>
  )
};

export default Promo;