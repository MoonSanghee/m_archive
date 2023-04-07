import React, { useEffect, useState } from 'react';
import { Card, Toggle } from '../../../components';
import styles from './like.module.scss';
import { createLike, getLikes } from '../../../api/Movies';
import { useNavigate } from 'react-router-dom';

const Like = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const onGetMovies = async () => {
    const response = await getLikes();
    if (response.status === 200) {
      console.log(response.data);
      const items = [...response.data];
      //console.log("items",items);
      setMovies(items);
    }
  };

  // console.log(movies);

  const onNavigateDetail = (id) => {
    return () => {
      //MEMO: navigate를 할 때는 /가 있어야 함
      navigate(`/movies/detail/${id}`);
    };
  };

  useEffect(() => {
    onGetMovies();
  }, []);

  return (
    <div className={styles.wrapper}>
      <header>
        <h1>좋아요 관리</h1>
        <Toggle />
      </header>
      <section>
        {movies.map((item) => (
          <Card
            key={item.id}
            item={item}
            onClick={onNavigateDetail(item.id)}
            className={styles.movie}
            // NOTE: callback은 좋아요 삭제 혹은 생성 시에 실행되는 함수
            callback={onGetMovies}
          />
        ))}
      </section>
    </div>
  );
};

export default Like;
