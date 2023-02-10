import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";


function SavedMovies() {
    return (
    <section className="savedMovies__page">
      <Header />
      <div className="savedMovies__content">
        <SearchForm />
        <MoviesCardList />
        
      </div>
      <Footer />
    </section>
  )
};

export default SavedMovies;