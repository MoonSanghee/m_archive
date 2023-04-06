import React, { memo, useEffect, useState } from 'react';
import { LikeRedIcon, LikeIcon } from '../../../assets/icon';
import styles from './likebutton.module.scss';

const LikeButtonCard = ({ movieId, isLiked, onClick }) => {
  const [like, setLike] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    setLike(isLiked);
  }, [isLiked]);

  return (
    <label className={styles.wrapper}>
      <span className={styles.click} onClick={onClick}>
        {like === true ? (
          <LikeRedIcon className={styles.icon2} />
        ) : (
          <LikeIcon className={styles.icon} />
        )}
      </span>
    </label>
  );
};

export default memo(LikeButtonCard);
