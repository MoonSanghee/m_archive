import React, { useState } from 'react';
// import cx from "classnames";
import styles from './searchbox.module.scss';
import { SearchIcon } from '../../../assets/icon';
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchBox = ({ placeholder, ...props }) => {
  const [state, setState] = useState({ keyword: '', results: [] });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setState({ ...state, keyword: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleClick();
  };

  const handleClick = () => {
    navigate('/movies/search', {
      state,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchbox} {...props}>
      <button type="submit">
        <SearchIcon className={styles.icon} />
      </button>
      <input
        value={state.keyword}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </form>
  );
};

export default SearchBox;
