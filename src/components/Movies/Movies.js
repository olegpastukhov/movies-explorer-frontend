import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./Movies.css";

// импортируем константы

import { SHORT_MOVIE_DURATION } from '../../utils/constants.js';

// импортируем компоненты

import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

// импортируем getMovies из moviesApi

import { getMovies } from '../../utils/MoviesApi';

// компонент принимает пропсы из компонента App

function Movies({ loggedIn, onSave, onDelete, savedMovies, setPopupMessage, setIsPopupOpen, onLoading, isLoading }) {

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

  // стейт начального массива фильмов

  const [initMoviesList, setInitMoviesList] = useState([]);
  const [filteredMoviesList, setFilteredMoviesList] = useState([]);

  // обработчик поискового запроса

  const handleSetFoundMovies = (movies, query, checkbox) => {

    // локально отфильтровываем фильмы согласно запросу

    const foundMoviesList = filterMovies(movies, query, false);

    // если ничего не найдено - открывается попап с сообщением

    if (foundMoviesList.length === 0) {
      setPopupMessage('Ничего не найдено :)');
      setIsPopupOpen(true);
    }

    // устанавливаем стейт initMoviesList

    setInitMoviesList(foundMoviesList);

    // устанавливаем стейт filteredMoviesList в зависимости от состояния чекбокса

    setFilteredMoviesList(checkbox ? (foundMoviesList.filter(movie => movie.duration < SHORT_MOVIE_DURATION)) : foundMoviesList);


    // создаём локальное хранилище foundMovies

    localStorage.setItem('foundMovies', JSON.stringify(foundMoviesList));
  };

  // стейт состояния чекбокса и массива фильмов с Api

  const [shortMoviesFilter, setShortMoviesFilter] = useState(false);
  const [moviesFromServer, setMoviesFromServer] = useState([]);


  // обработчик массива короткометражек

  const handleShortMoviesList = () => {
    setShortMoviesFilter(!shortMoviesFilter);
    if (!shortMoviesFilter) {
      setFilteredMoviesList(initMoviesList.filter(movie => movie.duration < SHORT_MOVIE_DURATION));
      if (filteredMoviesList.length === 0) {
      }
    } else {
      setFilteredMoviesList(initMoviesList);
    }
    localStorage.setItem('shortMoviesFilter', !shortMoviesFilter); // сохраняем состояние чекбокса в хранилище
  };

  // обработчик поискового запросов

  const handleMovieSearchSubmit = (value) => {
    if (!value || value.trim().length === 0) {
      setPopupMessage('Пожалуйста, введите ключевое слово.'); // сообщение в попапе при попытке пустого запроса
      setIsPopupOpen(true);
      return;
    }

    localStorage.setItem('lastSearch', value); // записываем поисковое слово в хранилище
    localStorage.setItem('shortMoviesFilter', shortMoviesFilter); // записываем состояние чекбокса в хранилище 

    // если фильмы с Api не получены - получаем, сохраняем в хранилище moviesFromServer
    // и передаём обработчику поискового запроса

    if (moviesFromServer.length === 0) {
      onLoading(true);
      getMovies()
        .then(movies => {
          localStorage.setItem('moviesFromServer', JSON.stringify(movies));
          setMoviesFromServer(movies);
          handleSetFoundMovies(
            movies,
            value,
            shortMoviesFilter
          );
        })
        .catch((err) => {
          setPopupMessage(`Упс! Произошла ошибка: ${err}`);
          setIsPopupOpen(true);
        })
        .finally(() => onLoading(false));
    } else {
      handleSetFoundMovies(moviesFromServer, value, shortMoviesFilter);
    }
  }

  // обращаемся к хранилищу, получаем состояние фильтра, чтобы правильно его показать на странице

  useEffect(() => {
    if (localStorage.getItem('shortMoviesFilter') === 'true') {
      setShortMoviesFilter(true);
    } else {
      setShortMoviesFilter(false);
    }
  }, [location]);

  // устанавливаем filteredMoviesList в нужное состояние в зависимости от состояния фильтра

  useEffect(() => {
    if (localStorage.getItem('foundMovies')) {
      const movies = JSON.parse(
        localStorage.getItem('foundMovies')
      );
      setInitMoviesList(movies);
      if (
        localStorage.getItem('shortMoviesFilter') === 'true'
      ) {
        setFilteredMoviesList(movies.filter(movie => movie.duration < SHORT_MOVIE_DURATION));
      } else {
        setFilteredMoviesList(movies);
      }
    }
  }, [location]);

  return (
    <>
      <section className="movies">
        <Header loggedIn={loggedIn} />
        <div className="movies__container">
          <SearchForm
            onSearchMovies={handleMovieSearchSubmit}
            onFilter={handleShortMoviesList}
            shortMoviesFilter={shortMoviesFilter}
            isSavedMoviesPage={false} />
          <MoviesCardList
            onSave={onSave}
            onDelete={onDelete}
            movies={filteredMoviesList}
            isSavedMoviesPage={false}
            savedMovies={savedMovies}
          />
        </div>
        <Preloader isLoading={isLoading} />
        <Footer />
      </section>
    </>
  )
};

export default Movies;