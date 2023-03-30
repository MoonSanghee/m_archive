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
  console.log(reviews);
  const navigate = useNavigate();
  //ReviewCardWrapper크기알아야함!!
  const [slidePx, setSlidePx] = useState(0);
  const [position, setPosition] = useState(0);

  const onNavigateDetail = (id) => {
    return () => {
      //MEMO: navigate를 할 때는 /가 있어야 함
      //navigate(`/movies/detail/${id}/reviews`);
    };
  };

  const onMove = () => {
    setSlidePx(position * 1000);
  };
  const onClick = (idx) => {
    setPosition(idx);
    onMove();
  };

  if (!reviews) return;
  return (
    <section className={styles.wrapper}>
      {/*<ChevronArrow className={styles.prevBtn} onClick={toPrev} />*/}

      <ul className={styles.ulWrapper}>
        {reviews.map((review) => {
          return (
            <Review
              slide={slidePx}
              key={`Review-${review.id}`}
              review={review}
              //onClick={onNavigateDetail(review.id)}
              //type={type}
              //idx={idx}
            />
          );
        })}
      </ul>
      <div className={styles.eclipseWrapper}>
        <EclipseIcon
          className={cx({ [styles.clicked]: position === 1 })}
          onClick={() => {
            onClick(1);
          }}
        />
        <EclipseIcon
          className={cx({ [styles.clicked]: position === 2 })}
          onClick={() => {
            onClick(2);
          }}
        />
        <EclipseIcon
          className={cx({ [styles.clicked]: position === 3 })}
          onClick={() => {
            onClick(3);
          }}
        />
        <EclipseIcon
          className={cx({ [styles.clicked]: position === 4 })}
          onClick={() => {
            onClick(4);
          }}
        />
      </div>
      {/*<ChevronArrow className={styles.nextBtn} onClick={toNext} />*/}
    </section>
  );
};

export default ReviewCarousel;
