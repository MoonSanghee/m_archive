import React, { useEffect, useState } from 'react';
import {
  AdminLNB,
  Button,
  CheckBox,
  SearchBox,
  TableMenu,
} from '../../../components';
import styles from './manage.module.scss';
import tableStyle from '../tableStyle.module.scss';
import { getMovies } from '../../../api/Movies';
import { countMovies } from '../../../api/Movies';
import Pagination from '../../../components/Common/PageNation';
import { useNavigate } from 'react-router-dom';
import { getTokens } from '../../../utils';
import { useMount } from 'react-use';

const ManageMoviesPage = () => {
  const navigate = useNavigate();
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [isReversed, setIsReversed] = useState('asc');
  const [isOrderBy, setIsOrderBy] = useState('NAME');

  const isAllChecked = selectedMovies.length === movies.length;

  const onClick = () => {
    setIsChecked(!isChecked);
  };
  const onClickLogout = () => {
    localStorage.clear();
    navigate('/admin/login');
  };
  //NOTE: 기능에 맞는 네이밍
  //NOTE: 타이핑을 "할 때마다" fetch를 하는 상태
  //NOTE: throttle을 사용 (lodash -> lodash-es)
  const onChangeSearch = async (event) => {
    const response = await getMovies(1, 10, event.target.value);
    if (response.status === 200) {
      const items = [...response.data.data];
      setMovies(items);
      setTotalPages(Math.ceil(items.length / pageLimit));
      setCurrentPage(1);
    }
    if (event.target.value === '') {
      // 검색어가 비어있는 경우
      setTotalPages(response.length / pageLimit);
      setCurrentPage(1);
      return;
    }
  };

  const onGetMovies = async () => {
    const response = await getMovies(1, 10, '', isOrderBy, isReversed);
    if (response.status === 200) {
      const items = [...response.data.data];
      setMovies(items);
    }
  };

  //NOTE: 선택 관련
  //NOTE: 선택된 요소들을 가지고 있을 state (selectedMovies)
  //NOTE: selectedMovies => TableElements에서 id를 비교 => selectdMovies안에 id가 있으면?
  //NOTE: => checked <Checkbox checked={selectedMovies.includes(movie.id)}/>

  const onCheckMovie = (id) => {
    return () => {
      // selectedMovies에 id가 있으면 => selectedMovies에서 id를 빼준다
      if (selectedMovies.includes(id)) {
        setSelectedMovies(selectedMovies.filter((movieId) => movieId !== id));
      } else {
        // selectedMovies에 id가 없으면 => selectedMovies에 id를 넣어준다
        setSelectedMovies([...selectedMovies, id]);
      }
    };
  };

  //NOTE: 전체 선택? => 불러온 모든 movie들의 id를 selectedMovies에 넣어주면 됩니다~
  //NOTE: 전체 선택 해체? => selectedMovies를 빈 배열로 바꾸면 됩니다~
  const onCheckAll = () => {
    // 선택된 영화의 수  === 전체 영화의 수  => 전체 선택이 되어있는 경우
    if (isChecked) {
      setSelectedMovies([]);
    } else {
      // 선택된 영화의 수  !== 전체 영화의 수  => 전체 선택이 안되어있는 경우ㄴ
      setSelectedMovies(movies.map((movie) => movie.id));
    }
  };

  useEffect(() => {
    onGetMovies();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    const response = await getMovies(
      currentPage,
      pageLimit,
      '',
      isOrderBy,
      isReversed,
    );
    const count = await countMovies();

    if (response.status === 200) {
      const items = [...response.data.data];

      //NOTE: 전체 선택을 해제하는 함수 호출을 fetch 이후에 다른 state 동시에 처리를 해주면 된다.
      setIsChecked(false);
      setSelectedMovies([]);

      setTotalPages(Math.ceil(count.data.count / pageLimit));
      setMovies(items);
    }
  };

  const orderBy = async (item) => {
    setIsOrderBy(item.id);
    setIsReversed((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getMovies(1, pageLimit, '', isOrderBy, isReversed);
      setMovies(response.data.data);
      setCurrentPage(1);
    }
    fetchData();
  }, [isOrderBy, isReversed]);

  useEffect(() => {
    fetchData();
  }, [currentPage, pageLimit]);

  useMount(() => {
    if (!getTokens().accessToken) navigate('/admin/login');
  });

  return (
    <main className={styles.wrapper}>
      {/* //TODO: main이랑 AdminLNB는 AdminLayout으로 분리 */}
      <AdminLNB />
      <section className={styles.allSection}>
        <div className={styles.header}>
          <Button
            color="secondary"
            width="long"
            children={'로그아웃'}
            onClick={onClickLogout}
          />
        </div>
        <p className={styles.topMenu}>
          <span className={styles.menuLeft}>
            <CheckBox
              className={styles.check}
              checked={isChecked}
              onChange={onCheckAll}
              onClick={onClick}
              id="SelectAll"
            />
            전체선택
          </span>
          <span className={styles.menuRight}>
            {/* <Button width={'long'} color={'secondary'}>
              선택 삭제
            </Button> */}
            <SearchBox
              className={styles.searchBox}
              placeholder="제목, 배우, 감독"
              onChange={onChangeSearch}
              // onSubmit={onChangeSearch}
            />
          </span>
        </p>
        <p className={styles.secondMenu}>
          <TableMenu info={movies} tableName="movieInfo" onClick={orderBy} />
        </p>
        <p className={styles.table}>
          <div>
            <table className={tableStyle.movies}>
              {movies.map((movie, idx) => {
                console.log(movie)
                const actors = movie.actors.slice(0, 3);
                return (
                  <li key={idx} className={tableStyle.elements}>
                    <CheckBox
                      className={tableStyle.check}
                      checked={selectedMovies.includes(movie.id)}
                      onChange={onCheckMovie(movie.id)}
                    />
                    <span>{movie.title}</span>
                    <span>{movie.releasedAt}</span>
                    <span className={styles.block}>
                      {movie.genres.map((genre) => (
                        <span key={genre.id} className={styles.data}>{genre.name}</span>
                      ))}
                    </span>
                    <span>
                      {actors.map((actor) => {
                        return <span className={styles.data}>{actor.name}</span>
                      })}
                    </span>
                    <span>
                      {movie.staffs.map((staff) => {
                        if (staff.role === '감독') {
                          return <span className={styles.data} key={staff.id}>{staff.name}</span>;
                        }
                      })}
                    </span>
                  </li>
                );
              })}
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </p>
      </section>
    </main>
  );
};

export default ManageMoviesPage;
