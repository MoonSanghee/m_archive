import React, { useEffect, useState } from 'react';
import { BlockIcon, LikeBlackIcon, LikeRedIcon } from '../../../assets/icon';
import styles from './card.module.scss';
import cx from 'classnames';
// import LikeButton from '../LikeButton';
import { createLike, deleteLike } from '../../../api/Movies';
import LikeButtonCard from '../LikeButtonCard';

const Card = ({ item, onClick, type, idx }) => {
  const [genres, setGenres] = useState('');
  const movie = item;

  const onCreateLike = async () => {
    const response = await createLike(movie.id);
    if (response.status === 201) {
      console.log('생성');
      //???
    }
  };

  const onDeleteLike = async () => {
    const response = await deleteLike(movie.id);
    if (response.status === 204) {
      console.log('삭제');
      //???
    }
  };

  const onLikeBtn = () => {
    movie.isLiked === false ? onCreateLike() : onDeleteLike();
  };

  useEffect(() => {
    let genre = item.genres.reduce((acc, cur) => acc + cur.name + '/', '');
    genre = genre.substring(0, genre.length - 1);
    setGenres(genre);
  }, [movie.isLiked]);

  return (
    <div
      className={cx(styles.cardWrapper, {
        [styles.top10First]: type === 'top10' && idx === 0,
      })}
    >
      <div className={styles.card_inner}>
        <div className={styles.card_front}>
          <img src={item?.postImage} alt={item?.title} />
        </div>
        <div className={styles.card_back}>
          <div className={styles.card_content} onClick={onClick}>
            <h2 className={styles.title}>{item?.title}</h2>
            <h3>{genres}</h3>
            <p>{item?.plot}</p>
          </div>
          <div className={styles.menu}>
            <LikeButtonCard
              movieId={movie?.id}
              onClick={onLikeBtn}
              isLiked={movie?.isLiked}
            />
            <BlockIcon className={styles.icon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
