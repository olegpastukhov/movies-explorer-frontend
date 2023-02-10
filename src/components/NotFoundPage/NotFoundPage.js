import React from 'react';
import './NotFoundPage.css';
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className='page__container'>
      <div className='page__info-block'>
        <span className='page__status'>404</span>
        <span className='page__notfound'>Страница не найдена</span>
      </div>
      <Link to="/"><button className='page__go-back-btn'>Назад</button></Link>
    </div>
  )
};

export default NotFoundPage;