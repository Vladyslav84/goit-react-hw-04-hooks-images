import React, { useState } from 'react';
import s from './SearchBar.module.css';

function SearchBar({onSubmit}) {
    const [inputValue, setInputValue] = useState('');

 function handleChange  (e)  {
     setInputValue(e.target.value);

  };

 function handleSubmit  (evt) {
    evt.preventDefault();
    onSubmit(inputValue);
    resetinputValue();

  };

  function resetinputValue() {
   setInputValue('');

  };

    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputValue}
            onChange={handleChange}

          />
        </form>
      </header>
    )
  
}

export default SearchBar;