import React from 'react';
import { Link } from "react-router-dom";
import './NotFoundPage.css';

// компонент не принимает пропсы, не содержит логики

function NotFoundPage() {
  return (
    <section className="notfound">
      <div className="notfound__container">
        <h1 className="notfound__heading">404</h1>
        <p className="notfound__message">Страница не найдена</p>
      </div>
      <Link to="/" className="notfound__link">Назад</Link>
    </section>
  )
};

export default NotFoundPage;