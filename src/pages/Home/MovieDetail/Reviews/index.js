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
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import cx from 'classnames';
import { useNavigate } from 'react-router-dom';
const Reviews = () => {
  const navigate = useNavigate();
  const ref = useRef();
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
    //NOTE: useEffect 사용 시 deps 항상 확인하기!
  }, []);
  useMount(() => {
    onGetMovie(params.id);
    onGetReviews(params.id);
  });
  return (
    <main ref={ref} className={cx(styles.wrapper)}>
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
