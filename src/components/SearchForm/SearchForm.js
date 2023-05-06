import React, { useEffect } from "react";
import './SearchForm.css';
import { useLocation } from 'react-router-dom';

// импортируем хук useForm

import useForm from '../../hooks/useForm';

// импортируем компонент FilterCheckbox

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

// компонент принимает несколько пропсов 

function SearchForm({ shortMovies, isSavedMoviesPage, onFilter, onSearchMovies, disabled }) {

    // const [searchRequest, setSearchRequest] = React.useState('');
    // function handleSearchRequestChange(e) {
    //     setSearchRequest(e.target.value);
    // }

    // получаем всё необходимое через useForm

    const { values, handleValueChange, isValid } = useForm();

    // получаем location

    const location = useLocation();

    // обработчик сабмита формы

    function handleFormSubmit(evt) {
        evt.preventDefault(); // отменяем действие по умолчанию
        onSearchMovies(values.searchValue, shortMovies, isValid); // передаём данные дальше
    }

    // обработчик сабмита формы поиска по сохранённым фильмам

    function handleSavedMoviesFormSubmit(evt) {
        evt.preventDefault() // отменяем действие по умолчанию
        onSearchMovies(values.searchValue, shortMovies); // передаём данные дальше
    }

    // если мы находимся на странице поиска фильма, в текстовом поле появляется текст запроса из localStorage

    useEffect(() => {
        if (location.pathname === '/movies' && localStorage.getItem('lastSearchMovieName')) {
            const lastSearchMovie = localStorage.getItem('lastSearchMovieName');
            values.searchValue = lastSearchMovie;
        }
    }, [location]);

    return (
        <section className="search-form">
            <div className='search-form__container'>
                <form className="search-form__form form" name={isSavedMoviesPage ? ("saved-movie-form") : ("movie-form")}
                    onSubmit={isSavedMoviesPage ? (handleSavedMoviesFormSubmit) : (handleFormSubmit)} noValidate >
                    <input name="search" placeholder="Фильм" type="text" className="search-form__input-field" required
                        value={values.searchValue || ''} onChange={handleValueChange} />
                    <button type="submit" className="search-form__button">Найти</button>
                </form>
            </div>
            <div className="search-form__filter">
                <FilterCheckbox onShortMovieFilter={onFilter} isShortMovieFilter={shortMovies} />
            </div>
        </section>
    )
};

export default SearchForm;