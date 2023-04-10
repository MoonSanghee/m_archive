import React, { useState } from 'react';
import ProfileDropdown from './ProfileDropdown';
import dropdownItems from './menu';
import { SearchBox } from '../../Common';
import styles from './header.module.scss';
import { useNavigate } from 'react-router-dom';
import { useMe } from '../../../hooks';
import { getMovies } from '../../../api/Movies';

const Header = () => {
  const navigate = useNavigate();

  const onClick = (item) => {
    return () => {
      navigate(item.path);
    };
  };

  const onClickLogo = () => {
    return navigate('/movies');
  };

  const [state, setState] = useState({ keyword: '', results: [] });

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
    <header className={styles.wrapper}>
      <div className={styles.logo}>
        <h1 onClick={onClickLogo}>M-archive</h1>
      </div>
      <nav className={styles.navWrapper}>
        {/*<span className={styles.movieButton}>영화</span>*/}
        <span className={styles.searchBox}>
          <SearchBox
            className={styles.search}
            value={state.keyword}
            onChange={handleChange}
            placeholder="제목, 배우, 감독"
            onSubmit={handleSubmit}
          />
        </span>
        <span className={styles.profileIcon}>
          <ProfileDropdown items={dropdownItems} onClick={onClick} />
        </span>
      </nav>
    </header>
  );
};
export default Header;
