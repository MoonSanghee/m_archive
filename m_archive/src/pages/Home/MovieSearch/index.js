import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styles from './moviesearch.module.scss';
import { getMovies } from '../../../api/Movies';
import { Card } from '../../../components/Common';
import { WarningIcon } from '../../../assets/icon';
import { useNavigate } from 'react-router-dom';

const MovieSearch = () => {
  const { state } = useLocation();
  const [movies, setMovies] = useState([]);
  const searchText = state.keyword;
  const navigate = useNavigate();
  // 제목검색
  const filteredFirst = movies.filter((item) =>
    item.title.replace(/ /g, '').includes(searchText.replace(/ /g, '')),
  );

  // 배우 검색
  // const filteredSecond = movies.map(() => {});

  //제목,배우,감독 검색 결과 모으기
  const result = [...filteredFirst];

  console.log(searchText);

  const onGetMovies = async () => {
    //서버에서 데이터를 불러옴.
    const response = await getMovies(1, 200);

    if (response.status === 200) {
      const items = [...response.data.data];
      setMovies(items);
    }
  };

  const onNavigateDetail = (id) => {
    return () => {
      //MEMO: navigate를 할 때는 /가 있어야 함
      navigate(`/movies/detail/${id}`);
    };
  };

  useEffect(() => {
    onGetMovies();
    console.log(searchText);
  }, []);

  return (
    <main className={styles.body}>
      {searchText !== '' && result.length !== 0 && (
        <div className={styles.searchedMovies}>
          <h2>{`"${searchText}"의 검색 결과입니다.`}</h2>
          <div className={styles.showMovies}>
            {result.map((item) => {
              return (
                <Card
                  key={item.id}
                  item={item}
                  onClick={onNavigateDetail(item.id)}
                />
              );
            })}
          </div>
        </div>
      )}
      {(searchText === '' || result.length === 0) && (
        <div className={styles.searchedNoMovies}>
          <WarningIcon className={styles.icon} />
          <h2>{`입력하신 검색어 "${searchText}" 와(과) 일치하는 결과가 없습니다.`}</h2>
          <ul>
            추천검색어:
            <li>다른 키워드를 입력해 보세요.</li>
            <li>영화 제목, 배우나 감독의 이름으로 검색해 보세요.</li>
          </ul>
        </div>
      )}
    </main>
  );
};

export default MovieSearch;
