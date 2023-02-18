import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__projects">
        <li>
          <a className="portfolio__link" rel="noopener noreferrer" href="https://github.com/olegpastukhov/how-to-learn" target="_blank">
            Статичный сайт
          </a>
          <span>↗</span>
        </li>
        <li>
          <a className="portfolio__link" rel="noopener noreferrer" href="https://github.com/olegpastukhov/russian-travel" target="_blank">
            Адаптивный сайт
          </a>
          <span>↗</span>
        </li>
        <li>
          <a className="portfolio__link" rel="noopener noreferrer" href="https://github.com/olegpastukhov/react-mesto-api-full" target="_blank">
            Одностраничное приложение
          </a>
          <span>↗</span>
        </li>
      </ul>
    </div>
  )
};

export default Portfolio;