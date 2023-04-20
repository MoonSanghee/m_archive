import React, { useState } from 'react';
import cx from 'classnames';
import styles from './searchbox.module.scss';
import { SearchIcon } from '../../../assets/icon';
import axios from 'axios';

const SearchBox = ({ placeholder, onSubmit, wrapperClassName, ...props }) => {
  const [state, setState] = useState({ keyword: '', results: [] });

  const handleChange = (event) => {
    setState({ ...state, keyword: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit && onSubmit();
  };

  return (
    <form
      className={cx(styles.searchbox, wrapperClassName)}
      onSubmit={handleSubmit}
    >
      <button type="submit">
        <SearchIcon className={styles.icon} />
      </button>
      <input {...props} placeholder={placeholder} className={styles.input} />
    </form>
  );
};

export default SearchBox;
