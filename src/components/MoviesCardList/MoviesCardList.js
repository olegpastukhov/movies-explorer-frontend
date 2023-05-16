import React, { useEffect, useState, useCallback } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

// импортируем необходимые константы

import {
  BIG_SCREEN_WIDTH,
  SMALL_SCREEN_WIDTH,
  SMALL_SCREEN_CARDS_COUNT,
  MIDDLE_SCREEN_CARDS_COUNT,
  BIG_SCREEN_CARDS_COUNT,
  MORE_CARDS_BIG_SCREEN_COUNT,
  MORE_CARDS_SMALL_SCREEN_COUNT
} from '../../utils/constants';

function MoviesCardList({ onSave, onDelete, movies, isSavedMoviesPage, savedMovies }) {

  // функция установки ширины экрана

  const setScreenWidth = () => {
    const getWidth = useCallback(() => window.innerWidth, []); // получаем ширину экрана
    const [width, setWidth] = useState(getWidth()); // устанавливаем стейт width
    useEffect(() => {
      let timer;
      function resizeController() {
        if (!timer) { timer = setTimeout(() => { timer = null; handleResize(); }, 1000); }// задержка в 1000 мс
      };
      // обработчик изменения размера экрана
      function handleResize() {
        setWidth(getWidth());
        window.addEventListener('resize', resizeController, false); // добавляем слушатель события resize
      };
      return () => window.removeEventListener('resize', handleResize); // удаляем слушатель события resize
    }, [getWidth]);

    return width;
  }

  // получаем значение ширины экрана

  const screenWidth = setScreenWidth();

  // получаем количество фильмов, если массив не пустой

  const moviesCount = movies ? movies.length : 0;

  // обработчик проверки наличия фильма в сохранённых

  const handleCheckSavedMovie = (moviesList, movieItem) => {
    return moviesList.find((item) => { return item.movieId === (movieItem.id || movieItem.movieId); });
  }

  // стейт счётчика кликов по кнопке "Ещё"

  const [clicksCount, setClicksCount] = useState(0);

  // обработчик нажатий на кнопку "Ещё", квеличивает clicksCount на единицу

  const handleMoreCardsClick = () => {
    setClicksCount(clicksCount + 1);
  }

  // стейт показываемых на странице карточек

  const [showMoviesOnPageList, setShowMoviesOnPageList] = useState(movies);

  // эффект, устанавливаем кол-во карточек в зависимости от ширины карточек

  useEffect(() => {
    if (screenWidth > BIG_SCREEN_WIDTH && !isSavedMoviesPage) {
      setShowMoviesOnPageList(movies.slice(0, BIG_SCREEN_CARDS_COUNT + MORE_CARDS_BIG_SCREEN_COUNT * clicksCount))
    } else if (screenWidth > SMALL_SCREEN_WIDTH && screenWidth <= BIG_SCREEN_WIDTH && !isSavedMoviesPage) {
      setShowMoviesOnPageList(movies.slice(0, MIDDLE_SCREEN_CARDS_COUNT + MORE_CARDS_SMALL_SCREEN_COUNT * clicksCount));
    } else if (screenWidth <= SMALL_SCREEN_WIDTH && !isSavedMoviesPage) {
      setShowMoviesOnPageList(movies.slice(0, SMALL_SCREEN_CARDS_COUNT + MORE_CARDS_SMALL_SCREEN_COUNT * clicksCount));
    } else {
      setShowMoviesOnPageList(movies);
    }
  }, [screenWidth, movies, savedMovies, clicksCount]);

  // показываем на странице нужное количество карточек, добавляем функциональность кнопке "Ещё"

  return (
    <section className="movies-cards">
      <ul className="movies-cards__list">
        {showMoviesOnPageList.sort().map(movie => {
          return <MoviesCard
            onSave={onSave}
            onDelete={onDelete}
            movie={movie}
            isSavedMovie={handleCheckSavedMovie(savedMovies, movie)}
            isSavedMoviesPage={isSavedMoviesPage}
            key={isSavedMoviesPage ? movie.movieId : movie.id}
          />
        })}
      </ul>
      {!isSavedMoviesPage && showMoviesOnPageList && moviesCount !== showMoviesOnPageList.length && (
        <button className="movies-cards__button" onClick={handleMoreCardsClick}>Ещё</button>
      )}
    </section>
  )
};

export default MoviesCardList;