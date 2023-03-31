import React, { useEffect, useState } from 'react';
import styles from './reviewCarousel.module.scss';
import { ChevronArrow } from '../../../../assets/icon';
import { useNavigate } from 'react-router-dom';
//import ReviewCard from "../../../../components/Common/ReviewCard";
import Review from './Review';
import { EclipseIcon } from '../../../../assets/icon';
import cx from 'classnames';
/**
 * items - 캐러셀 안에 들어갈 아이템배열
 *
 */

//NOTE: hook -> state -> 함수 -> useEffect

const ReviewCarousel = ({ reviews }) => {
  const navigate = useNavigate();
  //ReviewCardWrapper크기알아야함!!
  const [slidePx, setSlidePx] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  const [movePx, setMovePx] = useState(1920);

  //
  const onNavigateDetail = (id) => {
    return () => {
      //MEMO: navigate를 할 때는 /가 있어야 함
      //navigate(`/movies/detail/${id}/reviews`);
    };
  };

  const toPrev = () => {
    //card width - 1712 , homepage padding-48
    slidePx < 0 && setSlidePx(slidePx + movePx);
  };

  const toNext = () => {
    //card width - 1712 , homepage padding-48 , li gap - 8
    slidePx > - (movePx * moveCount) && setSlidePx(slidePx - movePx);
  };

  useEffect(() => {
  
    if(reviews.length <= 2 ) setMoveCount(0);
    else if(reviews.length <= 4  ) setMoveCount(1);
    else if(reviews.length <= 6 ) setMoveCount(2);
    else if(reviews.length <= 8 ) setMoveCount(3);
    else setMoveCount(4);

  }, []);

  if (!reviews) return;
  return (
    <section className={styles.wrapper}>
      <ChevronArrow className={styles.prevBtn} onClick={toPrev} />
      <ul className={styles.ulWrapper}>
        {reviews.map((review,idx) => {
          return (
            <Review
              slide={slidePx}
              key={`Review-${review.id}`}
              review={review}
              idx={idx}
              //onClick={onNavigateDetail(review.id)}
              //type={type}
              //idx={idx}
            />  
          );
          
        })}
      </ul>
      <ChevronArrow className={styles.nextBtn} onClick={toNext} />
    </section>
  );
};

export default ReviewCarousel;
