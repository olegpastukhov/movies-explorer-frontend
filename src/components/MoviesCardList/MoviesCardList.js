import React from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";

function MoviesCardList() {

  return (
    <section className="movies-cards">
      <ul className="movies-cards__list">
        <li><MoviesCard isSaved={true} /></li>
        <li><MoviesCard isSaved={true} /></li>
        <li><MoviesCard isSaved={false} /></li>
        <li><MoviesCard isSaved={false} /></li>
        <li><MoviesCard isSaved={true} /></li>
        <li><MoviesCard isSaved={true} /></li>
      </ul>
      <Preloader />
      <button className="movies-cards__button">Ещё</button>
    </section>
  )
};

export default MoviesCardList;