import React from 'react';
import './FilterCheckbox.css';

// компонет принимает пропсы isShortMovieFilter и onShortMovieFilter, необходимые для его работы

const FilterCheckbox = ({ isShortMovieFilter, onShortMovieFilter }) => {
  return (
    <section className="filter-checkbox">
      <input className="filter-checkbox__content" type="checkbox" onChange={onShortMovieFilter} checked={isShortMovieFilter} />
      <label className="filter-checkbox__label" >Короткометражки</label>
    </section>
  )
};

export default FilterCheckbox;