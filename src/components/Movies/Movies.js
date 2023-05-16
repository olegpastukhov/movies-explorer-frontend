import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Movies.css';

// импортируем константу

import { SHORT_MOVIE_DURATION } from '../../utils/constants.js';

// импортируем компоненты

import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

// компонент принимает пропсы из компонента App

function Movies({
  loggedIn,
  onSave,
  onDelete,
  onShortMoviesFilter,
  onFilteredMoviesList,
  onInitMoviesList,
  onSearchMovies,
  shortMoviesFilter,
  onFilter,
  filteredMoviesList,
  savedMovies,
  isLoading
}) {

  // получаем location

  const location = useLocation();

  // обращаемся к хранилищу, получаем состояние фильтра, чтобы правильно его показать на странице

  useEffect(() => {
    if (localStorage.getItem('shortMoviesFilter') === 'true') {
      onShortMoviesFilter(true);
    } else { onShortMoviesFilter(false); }
  }, [location]);

  // устанавливаем filteredMoviesList в нужное состояние в зависимости от состояния фильтра

  useEffect(() => {
    if (localStorage.getItem('foundMovies')) {
      const movies = JSON.parse(localStorage.getItem('foundMovies'));
      onInitMoviesList(movies);
      if (localStorage.getItem('shortMoviesFilter') === 'true') {
        onFilteredMoviesList(movies.filter(movie => movie.duration < SHORT_MOVIE_DURATION));
      } else { onFilteredMoviesList(movies); }
    }
  }, [location]);

  return (
    <section className="movies">
      <Preloader isLoading={isLoading} />
      <Header loggedIn={loggedIn} />
      <div className="movies__container">
        <SearchForm
          onSearchMovies={onSearchMovies}
          onFilter={onFilter}
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
      <Footer />
    </section>
  )
};

export default Movies;