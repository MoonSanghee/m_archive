import React from 'react';
import styles from './movie.module.scss';
import { Card } from '../../../../components/Common';
import cx from 'classnames';
const Movie = ({ movie, slide, onClick, type, idx }) => {
  //const { id, name, release_date, image_url } = movie;
  const { id } = movie;
  return (
    <li
      className={cx(styles.movie, styles[type])}
      id={`Movie-Li-${id}`}
      style={{
        transform: `translateX(${slide}px)`,
        transition: '0.5s ease',
      }}
    >
      {type === 'top10' && (
        <p className={cx(styles.rankingWrapper, { [styles.first]: idx === 0 })}>
          {idx + 1}
        </p>
      )}
      <Card
        id={`Card-${id}`}
        item={movie}
        onClick={onClick}
        type={type}
        idx={idx}
      />
    </li>
  );
};
export default Movie;
