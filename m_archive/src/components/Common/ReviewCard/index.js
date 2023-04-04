import React, { useEffect, useState } from 'react';
import styles from './reviewcard.module.scss';
import {
  ProfileIcon,
  EyeIcon,
  EyeBlindIcon,
  CommentIcon,
  CommentLikeIcon,
} from '../../../assets/icon';
import cx from 'classnames';
import StarRate from '../StarRate';
import dayjs from 'dayjs';

const diff = (date) => {
  const now = dayjs();
  return `${now.diff(date, 'day')}일 전`;
};
const ReviewCard = ({ item, onClick, ...props }) => {
  const [blind, setBlind] = useState(false);

  const onClickBlind = () => {
    setBlind(!blind);
  };
  const isExists = (attr) => {
    const result = item['user'][attr];
    //있으면 값, 없으면 false??
    if (!!result) return item['user'][attr];
    else return false;
  };

  return (
    <section className={styles.wrapper}>
      <div className={cx({ [styles.blind]: blind === true })}></div>
      <div className={cx(styles.cardWrapper)}>
        <div className={styles.infoWrapper}>
          <span className={styles.profileIcon}>
            <ProfileIcon />
          </span>
          <div className={styles.rateNicknameWrapper}>
            <div className={styles.scoreWrapper}>
              <StarRate
                //key={`starRate`}
                className={styles.score}
                id={`SR-${item.id}`}
                item={item}
              />
            </div>
            <p className={styles.nickname}>
              <span>{isExists('nickname') || isExists('name')}</span>
              <span> / 칭호</span>
            </p>
          </div>
          <span className={styles.eyeIcon}>
            {!blind ? (
              <EyeIcon onClick={onClickBlind} />
            ) : (
              <EyeBlindIcon onClick={onClickBlind} />
            )}
          </span>
        </div>
        <div className={styles.contentWrapper} onClick={onClick}>
          {!blind ? (
            <p className={styles.clientcomment}>{item?.content}</p>
          ) : (
            <p className={styles.clientcomment}>
              {'블라인드 처리된 리뷰입니다.'}
            </p>
          )}
        </div>
        <div className={styles.detailsWrapper}>
          <span className={styles.functionsWrapper}>
            <CommentLikeIcon />
            {item?.likeCount}
            <CommentIcon />
            {item?.comments.length}
          </span>
          <span className={styles.dateWrapper}>{diff(item?.updatedAt)}</span>
        </div>
      </div>
    </section>
  );
};

export default ReviewCard;

{
  /* //NOTE: 1) 시멘틱 요소를 사용하면 좋다. */
  /* //NOTE: 2) div를 사용한 depth가 너무 깊다. */
  /* 해당유저 아이콘넣기 */
  /* 별점 */
}
