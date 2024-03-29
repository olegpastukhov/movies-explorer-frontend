import React, { useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

// импортируем хук useLocation

import { useLocation } from 'react-router-dom';

// импортируем константу

import { SHORT_MOVIE_DURATION } from '../../utils/constants.js';

// компонент принимает многочисленные пропсы

function SavedMovies({
  loggedIn,
  onDelete,
  savedMovies,
  isLoading,
  onShowedSavedMoviesList,
  filterMovies,
  query,
  onQuery,
  onSearchMovies,
  onFilter,
  onShortSavedMoviesFilter,
  shortSavedMoviesFilter,
  showedSavedMoviesList
}) {

  // получаем location

  const location = useLocation();

  useEffect(() => {
    onShortSavedMoviesFilter(false);
    onQuery('');
    onShowedSavedMoviesList(savedMovies);
  }, [location]);

  //получаем массив показываемых фильмов

  useEffect(() => {
    if (shortSavedMoviesFilter === 'true') {
      onShowedSavedMoviesList(savedMovies.filter(movie => movie.duration < SHORT_MOVIE_DURATION));
    } else {
      const movies = filterMovies(savedMovies, query, shortSavedMoviesFilter);
      onShowedSavedMoviesList(movies);
    }
  }, [savedMovies, query, shortSavedMoviesFilter]);

  return (
    <section className="saved-movies">
      <Preloader isLoading={isLoading} />
      <Header loggedIn={loggedIn} />
      <div className="saved-movies__container">
        <SearchForm
          onSearchMovies={onSearchMovies}
          onFilter={onFilter}
          shortMoviesFilter={shortSavedMoviesFilter}
          isSavedMoviesPage={true} />
        <MoviesCardList
          isSavedMoviesPage={true}
          movies={showedSavedMoviesList}
          savedMovies={savedMovies}
          onDelete={onDelete} />
      </div>
      <Footer />
    </section>
  )
};

export default SavedMovies;