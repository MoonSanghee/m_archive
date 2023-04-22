import React, { useEffect, useState } from 'react';
import styles from './reviewcard.module.scss';
import {
  EyeIcon,
  EyeBlindIcon,
  CommentIcon,
  CommentLikeIcon,
} from '../../../../../assets/icon';
import cx from 'classnames';
import { StarRate,ProfileIcon } from '../../../../../components/Common';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
const diff = (date) => {
  const now = dayjs();
  return `${now.diff(date, 'day')}일 전`;
};
const ReviewCard = ({ item, onClick, ...props }) => {
  const navigate = useNavigate();
  const [blind, setBlind] = useState(false);

  const onClickBlind = () => {
    setBlind(!blind);
  };

  const onClickNavigate = ()=>{
    navigate(`/movies/user/${item?.user?.id}`);
  }

  return (
    <section className={styles.wrapper}>
      <div className={cx({ [styles.blind]: blind === true })}></div>
      <div className={cx(styles.cardWrapper)}>
        <div className={styles.infoWrapper}>
          <span className={styles.profileIcon}>
            <ProfileIcon user={item?.user} onClick={onClickNavigate}/>
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
              
              <span>{(item?.user?.nickname || item?.user?.name) ??"-"}</span>
              <span></span>
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

