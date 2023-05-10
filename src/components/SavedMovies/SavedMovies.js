import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from '../Preloader/Preloader';
import "./SavedMovies.css";

// импортируем хук useLocation

import { useLocation } from 'react-router-dom';

// импортируем константы

import { SHORT_MOVIE_DURATION } from '../../utils/constants.js';

// компонент принимает пропсы

function SavedMovies({ loggedIn, onDelete, setPopupMessage, setIsPopupOpen, savedMovies, isLoading }) {

  // получаем location

  const location = useLocation();

  // фильтр фильмов согласно запросу

  const filterMovies = (movies, query, checkbox) => {
    const moviesByQuery = movies.filter((movie) => {
      const movieNameRu = String(movie.nameRU).toLowerCase().trim(); // записываем русское название в нижнем регистре в переменную
      const movieNameEn = String(movie.nameEN).toLowerCase().trim(); // записываем английское название в нижнем регистре в переменную
      const queryMovie = query.toLowerCase().trim(); // записываем текст запроса в нижнем регистре в переменную
      return movieNameRu.indexOf(queryMovie) !== -1 || movieNameEn.indexOf(queryMovie) !== -1; // при совпадении добавляем в moviesByQuery
    });

    if (checkbox) {
      return moviesByQuery.filter(movie => movie.duration < SHORT_MOVIE_DURATION);
    } else {
      return moviesByQuery;
    }
  }

  // стейт состояния чекбокса

  const [shortMoviesFilter, setShortMoviesFilter] = useState(false);

  // обработчик короткометражек

  const handleShortMoviesList = () => {
    if (!shortMoviesFilter) {
      setShortMoviesFilter(true);
      localStorage.setItem('shortSavedMoviesFilter', true); // сохраняем состояние чекбокса в хранилище
      setShowedMoviesList(filteredMoviesList.filter(movie => movie.duration < SHORT_MOVIE_DURATION));
    } else {
      setShortMoviesFilter(false);
      localStorage.setItem('shortSavedMoviesFilter', false); // и здесь тоже, но false
      setShowedMoviesList(filteredMoviesList);
    }
  }

  // стейты массивов фильмов и поискового запроса

  const [showedMoviesList, setShowedMoviesList] = useState(savedMovies);
  const [filteredMoviesList, setFilteredMoviesList] = useState(showedMoviesList);
  const [query, setQuery] = useState('');

  // обработчик сабмита формы поиска по сохранённым фильмам

  const handleMovieSearchSubmit = (value) => {
    if (!value || value.trim().length === 0) {
      setPopupMessage('Пожалуйста, введите ключевое слово.'); // сообщение при пустом запросе
      setIsPopupOpen(true);
      return;
    }

    const movies = filterMovies(savedMovies, value, shortMoviesFilter);
    setQuery(value);

    if (movies.length === 0) {
      setPopupMessage('Ничего не найдено :)');
      setIsPopupOpen(true);
    } else {
      setFilteredMoviesList(movies);
      setShowedMoviesList(movies);
    }
  }

  // эффекты

  useEffect(() => {
    setFilteredMoviesList(savedMovies);
  }, [savedMovies]);

  // обращаемся к хранилищу, получаем состояние фильтра, чтобы правильно его показать на странице

  useEffect(() => {
    if (localStorage.getItem('shortSavedMoviesFilter') === 'true') {
      setShortMoviesFilter(true);
      setShowedMoviesList(savedMovies.filter(movie => movie.duration < SHORT_MOVIE_DURATION));
    } else {
      setShortMoviesFilter(false);
      const movies = filterMovies(savedMovies, query, shortMoviesFilter);
      setShowedMoviesList(movies);
    }
  }, [savedMovies, location, shortMoviesFilter]);

  return (
    <section className="saved-movies">
      <Preloader isLoading={isLoading} />
      <Header loggedIn={loggedIn} />
      <div className="saved-movies__container">
        <SearchForm
          onSearchMovies={handleMovieSearchSubmit}
          onFilter={handleShortMoviesList}
          shortMoviesFilter={shortMoviesFilter}
          isSavedMoviesPage={true} />
        <MoviesCardList
          isSavedMoviesPage={true}
          movies={showedMoviesList}
          savedMovies={savedMovies}
          onDelete={onDelete} />
      </div>
      <Footer />
    </section>
  )
};

export default SavedMovies;