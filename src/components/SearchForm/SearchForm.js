import React, { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import search_icon from "../../images/search-icon.svg";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
    onSearchMovies,
    onFilter,
    disabled,
    isSavedMoviesPage,
    shortMovies,
}) {

    const { enteredValues, handleChange, resetForm, isFormValid } = useForm();
    const location = useLocation();

    function handleFormSubmit(e) {
        e.preventDefault();
        onSearchMovies(enteredValues.searchRequest, isFormValid, shortMovies);
    }

    function handleSavedMoviesFormSubmit(e) {
        e.preventDefault()
        onSearchMovies(enteredValues.searchRequest, shortMovies, resetForm);
    }

    useEffect(() => {
        if (location.pathname === '/movies' && localStorage.getItem('movieSearch')) {
            const searchValue = localStorage.getItem('movieSearch');
            enteredValues.searchRequest = searchValue;
        }
    }, [location]);

    return (
        <section className="search">
            <>
                <div className='search__form-container'>
                    <span className='search__icon'><img src={search_icon} alt="Поиск"></img></span>
                    <form
                        className="search__form form"
                        name={isSavedMoviesPage ? ("search-saved-movie-form") : ("search-movie-form")} 
                        onSubmit={isSavedMoviesPage ? (handleSavedMoviesFormSubmit):(handleFormSubmit)}
                        noValidate>
                        <input
                            type="text"
                            placeholder="Фильм"
                            className="search__input"
                            required
                            name="searchRequest"
                            disabled={disabled}
                            value={enteredValues.searchRequest || ''}
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            className="search__button"
                            disabled="" />
                    </form>
                    <span className='search__line'></span>
                    <div className='search__filter-checkbox-right'>
                        <FilterCheckbox isMovieFilter={shortMovies} onFilter={onFilter} disabled={disabled} /></div>
                </div>
                <div className='search__filter-checkbox-bottom'>
                    <FilterCheckbox isMovieFilter={shortMovies} onFilter={onFilter} disabled={disabled} /></div>
            </>
        </section>
    )
};

export default SearchForm;
