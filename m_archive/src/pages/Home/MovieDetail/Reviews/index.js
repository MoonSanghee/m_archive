import React from 'react';
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

const Reviews = () => {
  const params = useParams();
  const [reviews, setReviews] = useState([]);
  const [movie, setMovie] = useState({});

  const [modalOption, showModal] = useModal();

  const onGetReviews = async (id) => {
    const response = await getMovieReviews(id);
    if (response.status === 200) {
      //const items = [...response.data];
      //setReviews(items);
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
      // console.log({ review });
      showModal(
        true,
        '',
        null,
        null,
        <ReviewDetailModal
          thisReview={review}
          onClose={() => {
            //NOTE: 생성/수정/삭제와 같이 데이터를 변경하는 API를 사용한다면 -> API 요청 완료 후에 재요청을 해야한다~
            modalOption.onClose();
            if (!params.id) {
              return;
            }
            //onGetMovie(params.id);
            //onGetReviews(params.id);
          }}
        />,
      );
    },
    [modalOption],
  );

  useMount(() => {
    onGetMovie(params.id);
    onGetReviews(params.id);
  });
  return (
    <main className={styles.wrapper}>
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
