import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";

function SavedMovies() {
    return (
    <section className="saved-movies">
      <Header />
      <div className="saved-movies__container">
        <SearchForm />
        <MoviesCardList />
      </div>
      <Footer />
    </section>
  )
};

export default SavedMovies;