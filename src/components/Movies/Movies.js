import React from 'react';
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import "./Movies.css";

function Movies() {
  return (
      <section className="movies">
        <Header />
        <div className="movies__container">
          <SearchForm />
          <MoviesCardList />
        </div>
        <Footer />
      </section>
  )
};

export default Movies;