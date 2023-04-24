import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = () => {
  return (
    <section className='filter-checkbox'>
      <input className='filter-checkbox__content' type='checkbox' id='checkbox'/>
      <label className='filter-checkbox__label' htmlFor='checkbox' >Короткометражки</label>
    </section>
  )
};

export default FilterCheckbox;