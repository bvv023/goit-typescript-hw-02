// src/components/SearchBar/SearchBar.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import { BsSearch } from "react-icons/bs";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() === "") {
      toast.error("Please enter a search query.");
      return;
    }
    onSubmit(inputValue);
    setInputValue("");
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
        <button type="submit" className={css.searchButton}>
          <BsSearch />
          &nbsp;Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
