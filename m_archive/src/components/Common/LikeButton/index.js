import React, { memo, useEffect, useState } from 'react';
import { LikeRedIcon, LikeBlackIcon, LikeIcon } from '../../../assets/icon';
import styles from './likebutton.module.scss';
import { createLike, deleteLike, getMovie } from '../../../api/Movies';
import { useMount } from 'react-use';

const LikeButton = ({ label, movieId, isLiked, onClick }) => {
  const [like, setLike] = useState(false);
  const [movie, setMovie] = useState({});

  const onGetMovie = async (id) => {
    const response = await getMovie(id);
    if (response.status === 200) {
      setMovie(response.data);
    }
  };

  //   const onCreateLike = async () => {
  //     const response = await createLike(movieId);
  //     if (response.status === 201) {
  //       onGetMovie(movieId);
  //     }
  //   };

  //   const onDeleteLike = async () => {
  //     const response = await deleteLike(movieId);
  //     if (response.status === 204) {
  //       onGetMovie(movieId);
  //     }
  //   };

  //   //NOTE: throttle / debounce => 한번에 여러 액션이 들어왔을 때 그 중 하나만 실행
  //   const onLikeBtn = () => {
  //     like === false ? onCreateLike() : onDeleteLike();
  //   };

  useMount(() => {
    onGetMovie(movieId);
  });

  useEffect(() => {
    setLike(isLiked);
  }, [isLiked]);

  console.log({ like });

  return (
    <label className={styles.wrapper}>
      <span className={styles.click} onClick={onClick}>
        {like === true ? (
          <LikeRedIcon className={styles.icon2} />
        ) : (
          <LikeIcon className={styles.icon} />
        )}
        {label && <span className={styles.label}>{label}</span>}
      </span>
    </label>
  );
};

export default memo(LikeButton);
