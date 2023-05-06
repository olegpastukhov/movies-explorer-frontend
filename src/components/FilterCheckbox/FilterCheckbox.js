import React from 'react';
import './FilterCheckbox.css';

// компонет принимает пропсы isShortMovieFilter и onShortMovieFilter

const FilterCheckbox = ({ isShortMovieFilter, onShortMovieFilter }) => {
  return (
    <section className='filter-checkbox'>
      <input className='filter-checkbox__content' type='checkbox' id='checkbox' onChange={onShortMovieFilter} checked={isShortMovieFilter} />
      <label className='filter-checkbox__label' htmlFor='checkbox' >Короткометражки</label>
    </section>
  )
};

export default FilterCheckbox;