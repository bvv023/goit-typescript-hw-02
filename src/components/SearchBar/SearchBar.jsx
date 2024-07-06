import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import css from './SearchBar.module.css';
import { BsSearch } from "react-icons/bs";

const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      toast.error('Please enter a search query.');
      return;
    }
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}><BsSearch />&nbsp;Search</button>
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
