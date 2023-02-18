import React, { useEffect, useState } from 'react';
import useScreenWidth from '../../hooks/useScreenWidth';
import MoviesCard from "../MoviesCard/MoviesCard";
// import Preloader from "../Preloader/Preloader";

import "./MoviesCardList.css";

import { checkSavedCard } from '../../utils/utils';

import {
  BIG_SCREEN_MOVIES_QTY,
  MIDDLE_SCREEN_MOVIES_QTY,
  SMALL_SCREEN_MOVIES_QTY,
  MORE_MOVIES_BIG_SCREEN_QTY,
  MORE_MOVIES_SMALL_SCREEN_QTY,
  BIG_SCREEN,
  SMALL_SCREEN
} from '../../utils/constants';

function MoviesCardList({
  movies,
  savedMovies,
  onSave,
  onDelete,
  isSavedMoviesPage
}) {

  const [showMovieList, setShowMovieList] = useState(movies);

  const screenWidth = useScreenWidth();

  const searchedMoviesCount = movies ? movies.length : 0;

  const [clicksCount, setClicksCount] = useState(0);

  const handleMoreClick = () => {
    setClicksCount(clicksCount + 1);
    // if (screenWidth > BIG_SCREEN) {
    //   setShowMovieList(movies.slice(0, showMovieList.length + MORE_MOVIES_BIG_SCREEN_QTY))
    // } else {
    //   setShowMovieList(movies.slice(0, showMovieList.length + MORE_MOVIES_SMALL_SCREEN_QTY))
    // }
  }

  useEffect(() => {
    if (screenWidth > BIG_SCREEN && !isSavedMoviesPage) {
      setShowMovieList(movies.slice(0, BIG_SCREEN_MOVIES_QTY + MORE_MOVIES_BIG_SCREEN_QTY * clicksCount))
    } else if (screenWidth > SMALL_SCREEN && screenWidth <= BIG_SCREEN && !isSavedMoviesPage) {
      setShowMovieList(movies.slice(0, MIDDLE_SCREEN_MOVIES_QTY + MORE_MOVIES_SMALL_SCREEN_QTY * clicksCount));
    } else if (screenWidth <= SMALL_SCREEN && !isSavedMoviesPage) {
      setShowMovieList(movies.slice(0, SMALL_SCREEN_MOVIES_QTY + MORE_MOVIES_SMALL_SCREEN_QTY * clicksCount));
    } else {
      setShowMovieList(movies);
    }
  }, [screenWidth, movies, savedMovies, clicksCount]);



  return (
    <section className="cards">
      <ul className="cards__list">
        {showMovieList.sort().map(movie => {
          return <MoviesCard
            key={isSavedMoviesPage ? movie.movieId : movie.id}
            movie={movie}
            isSavedMoviesPage={isSavedMoviesPage}
            onSave={onSave}
            onDelete={onDelete}
            saved={checkSavedCard(savedMovies, movie)}
          />
        })}
      </ul>
      {!isSavedMoviesPage && showMovieList && searchedMoviesCount !== showMovieList.length && (
        <button
          className="cards__button"
          onClick={handleMoreClick}
        >
          Ещё
        </button>
      )}
    </section>
  )
};

export default MoviesCardList;