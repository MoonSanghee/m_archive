import React, { memo, useEffect, useState } from 'react';
import { LikeRedIcon, LikeBlackIcon, LikeIcon } from '../../../assets/icon';
import styles from './likebutton.module.scss';

const LikeButton = ({ label, isLiked, onClick }) => {
  const [like, setLike] = useState(false);
 
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
        {label && <span className={styles.label}>{label}</span>}
      </span>
    </label>
  );
};

export default memo(LikeButton);
