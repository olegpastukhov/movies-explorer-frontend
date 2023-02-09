import React from "react";
import './SearchForm.css';
import search_icon from "../../images/search-icon.svg";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
    const [searchRequest, setSearchRequest] = React.useState('');
    function handleSearchRequestChange(e) {
        setSearchRequest(e.target.value);
    }
    return (
        <section className="search">
            <>
                <div className='search__form-container'>
                    <span className='search__icon'><img src={search_icon} alt="Поиск"></img></span>
                    <form className="search__form form" name="search-movie-form" noValidate>
                        <input
                            type="text"
                            placeholder="Фильм"
                            className="search__input"
                            required
                            name="searchRequest"
                            disabled=""
                            value={searchRequest || ''}
                            onChange={handleSearchRequestChange}
                        />
                        <button
                            type="submit"
                            className="search__button"
                            disabled="" />
                    </form>
                    <span className='search__line'></span>
                    <div className='search__filter-checkbox-right'><FilterCheckbox /></div>
                </div>
                <div className='search__filter-checkbox-bottom'><FilterCheckbox /></div>
            </>
        </section>
    )
};

export default SearchForm;