import React, { useState, useEffect } from 'react';
import styles from './tableElements.module.scss';
import CheckBox from '../CheckBox';
import { getMovies } from '../../../api/Movies';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  const onGetMovies = async () => {
    const response = await getMovies(1);
    if (response.status === 200) {
      const items = [...response.data.data];
      setMovies(items);
    }
  };
  useEffect(() => {
    onGetMovies();
  }, []);

  return (
    <table>
      {movies.map((movie) => {
        return (
          <td className={styles.elements}>
            <CheckBox className={styles.check} />
            <span>{movie.title}</span>
            <span>{movie.releasedAt}</span>
            <span className={styles.block}>
              {movie.genres.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </span>
            <span className={styles.actors}>
              {/* {movie.staffs.map((staff) => {
                if (staff.role === '출연') {
                  return <span>{staff.name}</span>
                }
              })} */}
            </span>
            {/* <span></span> */}
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
  );
};

export default Movies;

// dayjs
