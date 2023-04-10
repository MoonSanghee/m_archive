import React, { useEffect, useState } from 'react';
import {
  AdminLNB,
  Button,
  CheckBox,
  SearchBox,
  TableElements,
  TableMenu,
} from '../../../components';
import Movies from '../../../components/Common/TableElements/movies';
import styles from './manage.module.scss';
import movieStyle from "../../../components/Common/TableElements/tableElements.module.scss"
import { getMovies } from '../../../api/Movies';
import { countMovies } from '../../../api/Movies';
import Pagination from '../../../components/Common/PageNation';

const ManageMoviesPage = () => {
  //   // id로 담는다
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const isAllChecked = selectedMovies.length === movies.length;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const onGetMovies = async () => {
    const response = await getMovies(1, 10);
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
    if (isAllChecked) {
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
    const response = await getMovies(currentPage, pageLimit);
    const count = await countMovies();

    if (response.status === 200) {
      const items = [...response.data.data];
      setTotalPages(Math.ceil(count.data.count / pageLimit));
      setMovies(items);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageLimit]);

  return (
    <main className={styles.wrapper}>
      {/* //TODO: main이랑 AdminLNB는 AdminLayout으로 분리 */}
      <AdminLNB />
      <section className={styles.allSection}>
        <p className={styles.topMenu}>
          <span className={styles.menuLeft}>
            <CheckBox
              className={styles.check}
              checked={isAllChecked}
              onChange={onCheckAll}
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
            />
          </span>
        </p>
        <p className={styles.secondMenu}>
          <TableMenu tableName="movieInfo" />
        </p>
        <p className={styles.table}>
          <div>
            <table className={movieStyle.movies}>
              {movies.map((movie, idx) => {
                const createdAt = movie.createdAt
                return (
                  <tb key={idx} className={movieStyle.elements}>
                    <CheckBox
                      className={movieStyle.check}
                      checked={selectedMovies.includes(movie.id)}
                      onChange={onCheckMovie(movie.id)}
                    />
                    <span>{movie.title}</span>
                    <span>{movie.releasedAt}</span>
                    <span className={styles.block}>
                      {movie.genres.map((genre) => (
                        <span key={genre.id}>{genre.name}</span>
                      ))}
                    </span>
                    <span></span>
                    <span className={movieStyle.block}>
                      {movie.staffs.map((staff) => {
                        if (staff.role === "감독") {
                          return <span key={staff.id}>{staff.name}</span>
                        }
                      })}
                    </span>
                  </tb>
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
