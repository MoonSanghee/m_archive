import React, { useEffect, useState } from 'react';
import { ReviewCards, Toggle } from '../../../components';
import styles from './review.module.scss';
import { useRecoilState } from 'recoil';
import { meState } from '../../../recoil';
import { useNavigate } from 'react-router-dom';
import { getMe, modifyUser } from '../../../api/Users';
import { getMyReviews } from '../../../api/Reviews';
import { useMount } from 'react-use';

import { ProfileIcon, StarRate } from '../../../components';
import { CommentIcon, CommentLikeIcon } from '../../../assets/icon';

import dayjs from 'dayjs';
const diff = (date) => {
  const now = dayjs();
  return `${now.diff(date, 'day')}일 전`;
};

const Review = () => {
  const navigate = useNavigate();
  const [me, setMe] = useRecoilState(meState);
  const [reviews, setReviews] = useState([]);

  const onClickToggle = async () => {
    const userData = {
      isReviewView: !me?.isReviewView,
    };
    const response = await modifyUser(userData);
    if (response.status === 204) {
      onGetMe();
    } else {
      console.log('토글클릭에러 !');
    }
  };

  const onGetMe = async () => {
    const response = await getMe();
    if (response.status === 200) {
      setMe(response.data);
    }
  };

  const onGetMyReviews = async () => {
    const response = await getMyReviews();
    if (response.status === 200) {
      console.log(response.data);
      setReviews(response.data);
    }
  };

  const onNavigateDetail = (id) => {
    return () => {
      //MEMO: navigate를 할 때는 /가 있어야 함
      navigate(`/movies/detail/${id}`);
    };
  };

  const onClickComment = (id) => {
    return () => {
      //MEMO: navigate를 할 때는 /가 있어야 함
      navigate(`/movies/detail/${id}/reviews`);
    };
  };
  useEffect(() => {
    onGetMyReviews();
  }, []);

  useMount(() => {
    onGetMe();
  });

  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <header>
          <h1>리뷰 관리</h1>
          <Toggle checked={me?.isReviewView} onChange={onClickToggle} />
        </header>
        <section className={styles.cardContainer}>
          <div className={styles.container}>
            {reviews.map((item) => (
              <ReviewCards
                key={item.id}
                item={item}
                onClick={onNavigateDetail(item?.movie?.id)} //타이틀이없음
                className={styles.movie}
              />
            ))}
          </div>
        </section>
      </section>
      <section className={styles.section}>
        <header>
          <h1>댓글관리</h1>
        </header>
        <article>
          <div className={styles.commentsContainer}>
            {reviews?.map((item) =>
              item.comments?.map((comment) => (
                <div
                  className={styles.commentCards}
                  key={comment.id}
                  onClick={onClickComment(item?.movie?.id)}
                >
                  <img src={item?.movie?.postImage} alt={item?.movie?.title} />
                  <ProfileIcon user={item?.user} />
                  <div className={styles.contents}>
                    <div className={styles.info}>
                      <div className={styles.user}>
                        <p>{item?.user?.nickname || item?.user?.name}</p>
                        <StarRate id={`SR-${item.id}`} item={item} />
                      </div>
                      <div className={styles.function}>
                        <span>
                          <CommentLikeIcon />
                          {item?.likeCount}
                          <CommentIcon />
                          {item?.comments?.length}
                        </span>
                      </div>
                    </div>
                    <div className={styles.review}>
                      <p> {item?.content}</p>
                      <span>{diff(item?.updatedAt)}</span>
                    </div>
                    <div className={styles.commentbox}>
                      <p>{comment?.content}</p>
                      <span>{diff(comment?.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              )),
            )}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Review;
