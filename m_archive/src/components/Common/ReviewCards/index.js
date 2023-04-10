import React, { useEffect, useState } from 'react';
import { BlockIcon, LikeBlackIcon, LikeRedIcon } from '../../../assets/icon';
import styles from './ReviewCards.module.scss';
import cx from 'classnames';
// import LikeButton from '../LikeButton';
import { createLike, deleteLike } from '../../../api/Movies';
import LikeButton from '../LikeButton';
import StarRate from '../StarRate';

const ReviewCards = ({ item, onClick, type, idx, callback }) => {
  return (
    <div
      className={cx(styles.cardWrapper, {
        [styles.top10First]: type === 'top10' && idx === 0,
      })}
    >
      <div className={styles.card_inner}>
        <div className={styles.card_front}>
          <img src={item?.movie?.postImage} alt={item?.movie?.title} />
        </div>
        <div className={styles.card_back}>
          <div className={styles.card_content} onClick={onClick}>
            <h2 className={styles.title}>{item?.movie?.title}</h2>
            {/* <h3>내가 준 평점</h3> */}
            <div className={styles.scoreWrapper}>
              <StarRate
                //key={`starRate`}
                className={`styles.score styles.star`}
                id={`SR-${item.id}`}
                item={item}
              />
            </div>
            <h3>리뷰 : </h3>
            <p>{item?.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCards;
