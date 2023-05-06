import React from 'react';
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import "./Movies.css";

// компонент принимает пропс loggedIn и передаёт его в header

function Movies({ loggedIn }) {
  return (
      <section className="movies">
        <Header loggedIn={loggedIn}/>
        <div className="movies__container">
          <SearchForm />
          <MoviesCardList />
        </div>
        <Footer />
      </section>
  )
};

export default Movies;