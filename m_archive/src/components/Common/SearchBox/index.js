import React, { useState } from "react";
import cs from "classnames";
import styles from "./searchbox.module.scss";
import { SearchIcon } from '../../../assets/icon';

const SearchBox = () => {
  return (
    <form className={styles.searchbox}>
      <button type="submit">
        <SearchIcon className={styles.icon}/>
      </button>
      <input className={styles.input}/>
    </form>
  )
}

export default SearchBox
// 검색기능 구현 안 됨
// 서버 정보 받은 이후 추가 구현 필요