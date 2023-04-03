import React from 'react';
import styles from './review.module.scss';
import ReviewCard from '../../../../../components/Common/ReviewCard';
import cx from 'classnames';
const Review = ({ review, slide, onClick,idx }) => {
  //const { id, name, release_date, image_url } = movie;
  const { id } = review;
  return (
    <li
      className={cx(styles.review,{[styles.odd]:idx%2>0})}
      id={`Review-Li-${id}`}
      style={{
        transform: `translateX(${slide}px)`,
        transition: '0.5s ease',
      }}
    >
      <ReviewCard
        id={`Card-${id}`}
        item={review}
        //onClick={onClick}
        //type={type}
        //idx={idx}
      />
    
    </li>
  );
};
export default Review;
