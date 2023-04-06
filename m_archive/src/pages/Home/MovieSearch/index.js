import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styles from './moviesearch.module.scss';
import { getMovies } from '../../../api/Movies';
import { Card } from '../../../components/Common';
import { WarningIcon } from '../../../assets/icon';
import { useNavigate } from 'react-router-dom';

const MovieSearch = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const searchText = state.keyword;
  const [movies, setMovies] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const onGetMovies = async () => {
    const response = await getMovies(1, 200, searchText);
    if (response.status === 200) {
      const items = [...response.data.data];
      setMovies(items);
      setIsSuccess(true);
    }
  };

  const onNavigateDetail = (id) => {
    return () => {
      navigate(`/movies/detail/${id}`);
    };
  };

  useEffect(() => {
    setIsSuccess(false);
    onGetMovies();
  }, []);

  return (
    <main className={styles.body}>
      {searchText !== '' && movies.length !== 0 && (
        <div className={styles.searchedMovies}>
          <h2>{`"${searchText}"의 검색 결과입니다.`}</h2>
          <div className={styles.showMovies}>
            {movies.map((item) => {
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
      {/* //NOTE: isSuccess - 처음 뜨는거 막아두기  */}
      {(searchText === '' || movies.length === 0) && isSuccess && (
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
