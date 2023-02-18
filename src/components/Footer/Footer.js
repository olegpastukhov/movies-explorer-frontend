import "./Footer.css";
import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <span className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</span>
      <div className="footer__bottom-block">
        <span className="footer__copyright">&copy; {new Date().getFullYear()}</span>
        <div className="footer__socials">
          <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a>
          <a className="footer__link" href="https://github.com/olegpastukhov" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
      </div>

    </footer>
  )
};

export default Footer;