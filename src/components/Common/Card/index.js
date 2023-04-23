import React, { useEffect, useState } from 'react';
import { StarIcon } from '../../../assets/icon';
import styles from './card.module.scss';
import cx from 'classnames';
import { createLike, deleteLike } from '../../../api/Movies';
import LikeButton from '../LikeButton';
import { useMe } from '../../../hooks';
import { useRecoilValue } from 'recoil';
import { meState } from '../../../recoil';

const Card = ({ item, onClick, type, idx, callback, className }) => {
  const me = useRecoilValue(meState);
  const movie = item;
  const [genres, setGenres] = useState('');
  //NOTE: isLiked state를 useEffect를 통해 movie.isLiked로  초기화 하고나서 setIsLiked로 관리
  const [isLiked, setIsLiked] = useState(false);

  const onCreateLike = async () => {
    const response = await createLike(movie.id);
    if (response.status === 201) {
      console.log('생성');
      //???
      setIsLiked(true);
      callback && callback();
    }
  };

  const onDeleteLike = async () => {
    const response = await deleteLike(movie.id);
    if (response.status === 204) {
      console.log('삭제');
      setIsLiked(false);
      //???
      callback && callback();
    }
  };

  const onLikeBtn = () => {
    if (!me) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }
    isLiked === false ? onCreateLike() : onDeleteLike();
  };

  useEffect(() => {
    let genre = item.genres.reduce((acc, cur) => acc + cur.name + '/', '');
    genre = genre.substring(0, genre.length - 1);
    setGenres(genre);
  }, [isLiked]);

  useEffect(() => {
    setIsLiked(movie?.isLiked ?? false);
  }, [movie]);

  return (
    <div
      className={cx(
        styles.cardWrapper,
        {
          [styles.top10First]: type === 'top10' && idx === 0,
        },
        className,
      )}
    >
      {type === 'top10' && (
        <p className={cx(styles.rankingWrapper, { [styles.first]: idx === 0 })}>
          {idx + 1}
        </p>
      )}
      <div className={styles.card_inner}>
        <div className={styles.card_front}>
          <img src={item?.postImage} alt={item?.title} />
        </div>
        <div className={styles.card_back}>
          <div className={styles.card_content} onClick={onClick}>
            <h2 className={styles.title}>
              {item?.title}
              <span className={styles.starRate}>
                <StarIcon />
                {movie?.averageScore?.toFixed(1)}
              </span>
            </h2>
            <h3>{genres}</h3>
            <p>{item?.plot}</p>
          </div>
          <div className={styles.menu}>
            <LikeButton
              movieId={movie?.id}
              onClick={onLikeBtn}
              isLiked={isLiked}
            />
            <div onClick={onClick}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
