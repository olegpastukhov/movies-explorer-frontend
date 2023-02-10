import "./AboutMe.css";
import photo from "../../images/myphoto.jpg";

function AboutMe() {
  return (
    <div className="about-me" id="about-me">
      <h2 className="about-me__title" >Студент</h2>
      <div className="about-me__content">
        <div className="about-me__info">
          <span className="about-me__name">Олег Андреевич</span>
          <span className="about-me__job">Фронтенд-разработчик, 40 лет</span>
          <span className="about-me__bio">
            Родился в Москве, живу в пригороде. Работаю учителем информатики в московской школе. Мне давно было интересно обучиться специальности "Фронтенд-разработчик",
            так как это открывает для меня новые возможности, в том числе работать удалённо. Я женат, у меня четверо детей. Увлекаюсь музыкой, туризмом, фото и видео съёмкой.
          </span>
          <a className="about-me__link" href="https://github.com/olegpastukhov" target="_blank" rel="noreferrer">Github</a>
        </div>
        <img
          className="about-me__photo"
          src={photo}
          alt="Моя фотография"
        />
      </div>
    </div>
  )
};

export default AboutMe;