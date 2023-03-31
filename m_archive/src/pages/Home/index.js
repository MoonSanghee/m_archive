import React from 'react';
import styles from './home.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getMovies, getTop10Movies, getGenreMovies } from '../../api/Movies';
import { useState, useEffect, useCallback } from 'react';
import Carousel from './Carousel';

import { Card, Dropdown, Tag } from '../../components/Common';
import genre from './Genre/genre';
import { sortItems } from './Genre/sortItems';
// import {dropdownSortItems} from
import { useInView } from 'react-intersection-observer';

const Home = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView();

  const [top10Movies, setTop10Movies] = useState([]);
  const [movies, setMovies] = useState([]);
  //const [searchText, setSearchText] = useState("");

  const [genreMovies, setGenreMovies] = useState([]);
  const [pick, setPick] = useState(genre);
  const [select, setSelect] = useState([]); //선택한 tag 배열
  let genreSelected = '';

  const dropdownSortItems = sortItems;
  const [selectedSort, setSelectedSort] = useState(null);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [test, setTest] = useState([]);

  const onGetMovies = async () => {
    //서버에서 데이터를 불러옴.
    const response = await getMovies(1);

    if (response.status === 200) {
      //console.log(response.data.data);
      const items = [...response.data.data];
      //console.log("items",items);
      setMovies(items);
    }
  };

  const onGetTop10Movies = async () => {
    const response = await getTop10Movies();

    if (response.status === 200) {
      //console.log(response.data.data);
      const items = [...response.data.data];
      //console.log("items",items);
      setTop10Movies(items);
    }
  };

  const onGetGenreMovies = useCallback(async () => {
    const selected = genreSelected;
    const response = await getGenreMovies(page, selected);
    setLoading(true);

    if (response.status === 200) {
      // console.log(response.data.data);
      const items = [...response.data.data];
      setGenreMovies(items);
    }
    setLoading(false);
  }, [page]);

  //선택된 장르 문자열 (주소)
  {
    select.map((item) => {
      // console.log(item.genre);
      // console.log(typeof item);
      if (genreSelected !== '') {
        genreSelected += '%2C';
      }
      genreSelected += item.id;
    });
    // console.log(genreSelected);
  }

  const onNavigateDetail = (id) => {
    return () => {
      //MEMO: navigate를 할 때는 /가 있어야 함
      navigate(`/movies/detail/${id}`);
    };
  };

  //드랍다운
  const onClickSortDropdown = useCallback((item) => {
    return () => {
      setSelectedSort((prev) => (prev?.id === item.id ? null : item));
    };
  }, []);

  useEffect(() => {
    onGetMovies();
    onGetTop10Movies();
    onGetGenreMovies();
    //setMovies(movieListTest);
  }, [genreSelected]); //여기 genreSelected 를 넣어도 되는건가

  useEffect(() => {
    onGetGenreMovies();
  }, [onGetGenreMovies]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  return (
    <main className={styles.wrapper}>
      <section className={styles.top10Wrapper}>
        <h1 className={styles.header}>Top 10</h1>
        <Carousel movies={top10Movies} type="top10" />
      </section>
      <section className={styles.rcmdWrapper}>
        <h1 className={styles.header}>M-archive 영화 추천</h1>
        <Carousel movies={movies} type="recommend" />
      </section>
      <section className={styles.genreWrapper}>
        <h1 className={styles.header}>장르</h1>
        <nav className={styles.nav}>
          {/* genre tag */}
          <div className={styles.tag}>
            {pick.map((item) => {
              const onClickBtn = () => {
                !select.includes(item)
                  ? setSelect((select) => [...select, item])
                  : setSelect(select.filter((button) => button !== item));
                onGetGenreMovies();
              };
              return (
                <Tag
                  key={item.id}
                  // width={"middle"}
                  border={'border' + (select.includes(item) ? ' active' : '')}
                  onClick={onClickBtn}
                >
                  {item.genre}
                </Tag>
              );
            })}
          </div>
          <Dropdown
            items={dropdownSortItems}
            valueKey="name"
            value={selectedSort?.name}
            onClick={onClickSortDropdown}
          />
        </nav>
        {console.log(inView)}
        <div className={styles.genreMovies}>
          {genreMovies.length > 0 &&
            genreMovies.map((item) => {
              return (
                <Card
                  key={item.id}
                  item={item}
                  onClick={onNavigateDetail(item.id)}
                />
              );
            })}
        </div>
        <div ref={ref}></div>
        {/* ref - 마지막 아이템에 사용해야 하지만 컴포넌트에는 ref를 사용할 수 없음 */}
      </section>
    </main>
  );
};
export default Home;
