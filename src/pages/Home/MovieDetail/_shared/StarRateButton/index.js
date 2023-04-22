import React, { useEffect } from 'react';
import { useState, memo } from 'react';
import styles from './starRateButton.module.scss';
import { HalfStarIcon } from '../../../../../assets/icon';
import cx from 'classnames';
import { modifyReview, createReview } from '../../../../../api/Reviews';
import { useMount } from 'react-use';

const StarRateButton = ({ myReview, movieId, isModified, reload,me }) => {
  //TODO: 리뷰생성 코드작성.
  const [hoveredStarIndex, setHoveredStarIndex] = useState(0);
  const [clickedStarIndex, setClickedStarIndex] = useState(0);

  const setScore = async (score) => {
    if(!me){
      alert("로그인이 필요한 서비스입니다.");
      setClickedStarIndex(0);
      return;
    }
    //e.preventDefault();
    //e.stopPropagation();
    const reviewData = {
      score,
      content: '',
    };
    if (isModified) {
      //리뷰-별점 수정
      reviewData.content = myReview.content;
      const response = await modifyReview(myReview.id, reviewData);
      if (response.status === 204) {
        console.log('별점수정됨!');
      }
    } else {
      //리뷰(별점) 생성
      const response = await createReview(movieId, reviewData);
      if (response.status === 201) {
        console.log('별점생성됨!');
      }
      //setIsModified(true);
    }
  };

  const rates = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  const fillStarOfIndex = (num, event) => {
    if (event === 'enter' && hoveredStarIndex >= num) {
      return '#FCE22A';
    }
    if (event === 'leave' && clickedStarIndex >= num) {
      return '#FCE22A';
    }
    return '#ccc';
  };


  //NOTE: setState는 동시에 일어나지 않습니다. (비동기)
  useEffect(() => {
    if (myReview) {
      //console.log('리뷰존재');
      setClickedStarIndex(myReview.score);
    }
    //NOTE: deps에 myReview를 넣어야 합니다~ (state로 관리되는 객체이기 때문)
  }, [myReview]);

  return (
    <div>
      {rates.map((item, idx) => (
        <button
          className={styles.starsButton}
          key={'btn-' + idx}
          onMouseEnter={() => setHoveredStarIndex(item)}
          onMouseLeave={() => setHoveredStarIndex(0)}
          onClick={async () => {
            //NOTE: 전 : 1.5 -> 후 : 5.0 (item)
            setClickedStarIndex(item);
            await setScore(item);
            reload();
          }}
        >
          <HalfStarIcon
            className={cx(styles.halfStar, {
              [styles.rightStar]: idx % 2 !== 0,
            })}
            key={'halfStar' + idx}
            fill={fillStarOfIndex(
              item,
              hoveredStarIndex === 0 ? 'leave' : 'enter',
            )}
            //className={styles.starIcon}
          />
        </button>
      ))}
    </div>
  );
};
export default memo(StarRateButton);
