import React from 'react';
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a className="portfolio__link" rel="noopener noreferrer" href="https://github.com/olegpastukhov/how-to-learn" target="_blank">Статичный сайт
          <span>↗</span></a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" rel="noopener noreferrer" href="https://github.com/olegpastukhov/russian-travel" target="_blank">Адаптивный сайт
          <span>↗</span></a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" rel="noopener noreferrer" href="https://github.com/olegpastukhov/react-mesto-api-full" target="_blank">Одностраничное приложение
          <span>↗</span></a>
        </li>
      </ul>
    </section>
  )
};

export default Portfolio;