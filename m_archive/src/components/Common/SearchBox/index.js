import React, { useState } from "react";
// import cx from "classnames";
import styles from "./searchbox.module.scss";
import { SearchIcon } from '../../../assets/icon';
//import axios from 'axios';

const SearchBox = ({placeholder, ...props}) => {
  const [state, setState] = useState({ keyword: '', results: [] });

  const handleChange = (event) => {
    setState({ ...state, keyword: event.target.value });
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const { data } = await axios.get(`https://api.example.com/search?q=${query}`);
  //   setResults(data.results);
  // };

  return (
    <form 
    // onSubmit={handleSubmit}
    className={styles.searchbox} {...props}>
      <button type="submit">
        <SearchIcon className={styles.icon}/>
      </button>
      <input value={state.keyword} onChange={handleChange} placeholder={placeholder} className={styles.input}/>
    </form>
  )
}

export default SearchBox
// 검색기능 구현 안 됨
// 서버 정보 받은 이후 추가 구현 필요
// 검색 비동기 구현 필요