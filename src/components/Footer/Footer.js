import React from 'react';
import "./Footer.css";

// компонент не принимает пропсы, не содержит логики (кроме вычисления года), только возвращает разметку

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__content">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__links">
          <li><a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a></li>
          <li><a className="footer__link" href="https://github.com/olegpastukhov" target="_blank" rel="noopener noreferrer">Github</a></li>
        </ul>
      </div>

    </footer>
  )
};

export default Footer;