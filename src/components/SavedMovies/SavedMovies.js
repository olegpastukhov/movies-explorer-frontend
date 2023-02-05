import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";
import Preloader from "../Preloader/Preloader";

function SavedMovies() {
    return (
    <section className="savedMovies__page">
      <Header />
      <div className="savedMovies__content">
        <SearchForm />
        <Preloader />
      </div>
      <Footer />
    </section>
  )
};

export default SavedMovies;