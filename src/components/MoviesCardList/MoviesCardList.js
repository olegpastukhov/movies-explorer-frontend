import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

import "./MoviesCardList.css";

function MoviesCardList() {

  return (
    <section className="cards">
      <ul className="cards__list">
        <MoviesCard isSaved={true} />
        <MoviesCard isSaved={true} />
        <MoviesCard isSaved={false} />
        <MoviesCard isSaved={false} />
        <MoviesCard isSaved={true} />
        <MoviesCard isSaved={true} />
      </ul>
      <Preloader />
      <button className="cards__button">Ещё</button>
    </section>
  )
};

export default MoviesCardList;