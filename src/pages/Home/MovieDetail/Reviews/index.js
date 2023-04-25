import React, { useEffect } from 'react';
import styles from './reviews.module.scss';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useMount } from 'react-use';
import { getMovieReviews } from '../../../../api/Reviews';
import {ReviewCard} from '../_shared';
import useModal from '../../../../components/Common/Modal/useModal';
import { Modal } from '../../../../components/Common';
import { useCallback } from 'react';
import { getMovie } from '../../../../api/Movies';
import ReviewDetailModal from './ReviewDetailModal';
import { useLocation } from 'react-router-dom';
import cx from 'classnames';
import { useNavigate } from 'react-router-dom';
import { scrollTop } from '../../../../utils';


const Reviews = () => {
  const curUrl = window.location.href;
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const params = useParams();
  const [reviews, setReviews] = useState([]);
  const [movie, setMovie] = useState({});
  const [modalOption, showModal, onClose] = useModal();
  //const [isOpen,setIsOpen] = useState(false);

  const onNavigate = ()=>{
    navigate(`/movies/detail/${params.id}`);
  }
  const onGetReviews = async (id) => {
    const response = await getMovieReviews(id);
    if (response.status === 200) {
      const sorted = response.data.sort(function(a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt)
      }).reverse()
      setReviews(sorted);
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
          url={curUrl}
          thisReview={review}
          movieId={params.id}
          onClose={() => {
            //NOTE: 생성/수정/삭제와 같이 데이터를 변경하는 API를 사용한다면 -> API 요청 완료 후에 재요청을 해야한다~
            onClose();
            //setIsOpen(false);
          }}
        />,
      );
    },
    [params.id, modalOption],
  );
  useMount(() => {
    scrollTop();
    onGetMovie(params.id);
    onGetReviews(params.id);
  });
  return (
    <main className={cx(styles.wrapper)}>
      <h1 onClick={onNavigate} className={styles.title}>{movie?.title} </h1>
      <section className={cx(styles.reviewsWrapper)}>
        {reviews.map((review) => {
          return (
            <ReviewCard
              onClick={() => {
                //setIsOpen(true);
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
