import React from 'react';
import "./AboutMe.css";
import photo from "../../images/photo.jpg";

function AboutMe() {
  return (
    <section className="about-student">
      <h2 className="about-student__header" >Студент</h2>
      <div className="about-student__container">
        <div className="about-student__description">
          <h3 className="about-student__name">Олег Андреевич</h3>
          <p className="about-student__specialization">Фронтенд-разработчик, 40 лет</p>
          <p className="about-student__text">
            Родился в Москве, живу в пригороде. Работаю учителем информатики в московской школе. 
            Мне давно было интересно обучиться специальности "Фронтенд-разработчик",
            так как это открывает для меня новые возможности, в том числе работать удалённо. 
            Я женат, у меня четверо детей. Увлекаюсь музыкой, туризмом, фото и видео съёмкой.
          </p>
          <a className="about-student__link" href="https://github.com/olegpastukhov" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
        <img className="about-student__photo" src={photo} alt="Фотография студента" />
      </div>
    </section>
  )
};

export default AboutMe;