import React from 'react';
import './NotFoundPage.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {

  const history = useNavigate();

  return (
    <div className='page__container'>
      <div className='page__info-block'>
        <span className='page__status'>404</span>
        <span className='page__notfound'>Страница не найдена</span>
      </div>
      <Link to="/"><button onClick={() => history.go(-3)} className='page__go-back-btn'>Назад</button></Link>
    </div>
  )
};

export default NotFoundPage;