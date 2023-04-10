import React, { useEffect } from 'react';
import styles from './reviews.module.scss';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useMount } from 'react-use';
import { getMovieReviews } from '../../../../api/Reviews';
import { ReviewCard } from '../../../../components/Common';
import useModal from '../../../../components/Common/Modal/useModal';
import { Modal } from '../../../../components/Common';
import { useCallback } from 'react';
import { getMovie } from '../../../../api/Movies';
import ReviewDetailModal from './ReviewDetailModal';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';

const Reviews = () => {
  const ref = useRef();
  const pathname = useLocation().pathname;
  const params = useParams();
  const [reviews, setReviews] = useState([]);
  const [movie, setMovie] = useState({});

  const [modalOption, showModal] = useModal();

  const onGetReviews = async (id) => {
    const response = await getMovieReviews(id);
    if (response.status === 200) {
      setReviews(response.data);
    }
  };

  const onGetMovie = async (id) => {
    const response = await getMovie(id);
    if (response.status === 200) {
      setMovie(response.data);
    }
  };

  const onClickOpenModal = useCallback(
    ({ review }) => {
      showModal(
        true,
        '',
        null,
        () => onGetReviews(params.id),
        <ReviewDetailModal
          thisReview={review}
          movieId={params.id}
          onClose={() => {
            //NOTE: 생성/수정/삭제와 같이 데이터를 변경하는 API를 사용한다면 -> API 요청 완료 후에 재요청을 해야한다~
            modalOption.onClose();
            if (!params.id) {
              return;
            }
            //onGetMovie(params.id);
          }}
        />,
      );
    },
    [params.id, modalOption],
  );
  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollIntoView(
      {
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      },
      [pathname],
    );
  });
  useMount(() => {
    onGetMovie(params.id);
    onGetReviews(params.id);
  });
  return (
    <main ref={ref} className={styles.wrapper}>
      <h1>{movie?.title} </h1>
      <section className={styles.reviewsWrapper}>
        {reviews.map((review) => {
          return (
            <ReviewCard
              onClick={() => {
                onClickOpenModal({ review });
              }}
              key={review.id}
              item={review}
            />
          );
        })}
      </section>
      <Modal modalOption={modalOption} modalSize="big" />
    </main>
  );
};
export default Reviews;
