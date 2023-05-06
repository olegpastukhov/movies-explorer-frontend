import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";

// компонент принимает пропс loggedIn и передаёт его в header

function SavedMovies({loggedIn}) {
    return (
    <section className="saved-movies">
      <Header loggedIn={loggedIn}/>
      <div className="saved-movies__container">
        <SearchForm />
        <MoviesCardList />
      </div>
      <Footer />
    </section>
  )
};

export default SavedMovies;