import React, { useState, useEffect } from 'react';
import styles from './tableElements.module.scss';
import CheckBox from '../CheckBox';
import { getMovies, countMovies } from '../../../api/Movies';
import Pagination from '../PageNation';

const Movies = ({ page, limit, title, selectedMovies, onCheckMovie }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(limit);
  const [movieTitle, setMovieTitle] = useState(title);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await getMovies(currentPage, pageLimit, movieTitle);
      const count = await countMovies();
      if (response.status === 200) {
        setMovies([...response.data.data]);
        setTotalPages(Math.ceil(count.data.count / pageLimit));
      }
    };
    fetchData();
  }, [currentPage, pageLimit, movieTitle]);

  return (
    <div className="movie-list">
      <table>
        {movies.map((movie, idx) => {
          return (
            <td key={idx} className={styles.elements}>
              <CheckBox
                className={styles.check}
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
              {/* <span className={styles.actors}>
                {movie.staffs.map((staff) => {
                  if (staff.role === '출연') {
                    return <span>{staff.name}</span>
                  }
                })}
              </span> */}
              <span></span>
              <span className={styles.block}>
                {movie.staffs.map((staff) => {
                  if (staff.role === '감독') {
                    return <span>{staff.name}</span>;
                  }
                })}
              </span>
            </td>
          );
        })}
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Movies;
