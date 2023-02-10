import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
// import Preloader from "../Preloader/Preloader";

import "./Movies.css";

function Movies() {
  return (
    <section className="movies__page">
      <Header />
      <div className="movies__content">
        <SearchForm />
        <MoviesCardList />
      </div>
      <Footer />
    </section>
  )
};

export default Movies;