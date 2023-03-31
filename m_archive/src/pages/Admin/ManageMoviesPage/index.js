import React from 'react';
import {
  AdminLNB,
  Button,
  CheckBox,
  SearchBox,
  TableElements,
  TableMenu,
} from '../../../components';
import styles from './manage.module.scss';

const ManageMoviesPage = () => {
  //NOTE: 선택 관련
  //NOTE: 선택된 요소들을 가지고 있을 state (selectedMovies)
  //NOTE: selectedMovies => TableElements에서 id를 비교 => selectdMovies안에 id가 있으면?
  //NOTE: => checked <Checkbox checked={selectedMovies.includes(movie.id)}/>

  //NOTE: 전체 선택? => 불러온 모든 movie들의 id를 selectedMovies에 넣어주면 됩니다~
  //NOTE: 전체 선택 해체? => selectedMovies를 빈 배열로 바꾸면 됩니다~
  return (
    <main className={styles.wrapper}>
      <AdminLNB />
      <section className={styles.allSection}>
        <p className={styles.topMenu}>
          <span className={styles.menuLeft}>
            <CheckBox className={styles.check} />
            전체선택
          </span>
          <span className={styles.menuRight}>
            <Button width={'long'} color={'secondary'}>
              선택 삭제
            </Button>
            <SearchBox
              className={styles.searchBox}
              placeholder="제목, 배우, 감독"
            />
          </span>
        </p>
        <p className={styles.secondMenu}>
          <TableMenu tableName="movieInfo" />
        </p>
        <div className={styles.table}>
          <TableElements />
        </div>
      </section>
    </main>
  );
};

export default ManageMoviesPage;
