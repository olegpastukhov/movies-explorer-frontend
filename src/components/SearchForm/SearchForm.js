import React from "react";
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
    const [searchRequest, setSearchRequest] = React.useState('');
    function handleSearchRequestChange(e) {
        setSearchRequest(e.target.value);
    }
    return (
        <section className="search-form">
            <div className='search-form__container'>
                <form className="search-form__form form" name="search-form">
                    <input name="search" placeholder="Фильм" type="text" className="search-form__input-field" required
                        value={searchRequest || ''}
                        onChange={handleSearchRequestChange}
                    />
                    <button type="submit" className="search-form__button">Найти</button>
                </form>
            </div>
            <div className="search-form__filter"><FilterCheckbox /></div>
        </section>
    )
};

export default SearchForm;