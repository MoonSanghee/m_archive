import React, { useEffect } from "react";
import { useState, memo } from "react";
import styles from "./starRateButton.module.scss";
import { HalfStarIcon } from "../../../../../assets/icon";
import cx from "classnames";
import { modifyReview,createReview } from "../../../../../api/Reviews";
import { useMount } from "react-use";

const StarRateButton = ({ myReview,movieId,isModified,reload}) => {
  //TODO: 리뷰생성 코드작성.
  const [hoveredStarIndex, setHoveredStarIndex] = useState(0);
  const [clickedStarIndex, setClickedStarIndex] = useState(0);

  const setScore = async () =>{
    //e.preventDefault();
    //e.stopPropagation();
    const reviewData = {
      score: clickedStarIndex,
      content:"",
    };
    if (isModified) {
      //리뷰-별점 수정
      reviewData.content = myReview.content;
      const response = await modifyReview(myReview.id, reviewData);
      if(response.status === 204){
        console.log("별점수정됨!");
      }
    } else {
      //리뷰(별점) 생성
      const response = await createReview(movieId, reviewData);
      if(response.status === 201){
        console.log("별점생성됨!");
      }
      //setIsModified(true);
    }
  }
  


 

  const rates = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  const fillStarOfIndex = (num, event) => {
    if (event === "enter" && hoveredStarIndex >= num) {
      return "#FCE22A";
    }
    if (event === "leave" && clickedStarIndex >= num) {
      return "#FCE22A";
    }
    return "#ccc";
  };


  useEffect(()=>{
    setScore();
    
  },[clickedStarIndex])
  useEffect(()=>{
    if(myReview){
      console.log('리뷰존재');
      setClickedStarIndex(myReview.score);
    }
  },[])
 
  return (
    <div>
      {rates.map((item, idx) => (
        <button
          className={styles.starsButton}
          key={"btn-" + idx}
          onMouseEnter={() => setHoveredStarIndex(item)}
          onMouseLeave={() => setHoveredStarIndex(0)}
          onClick={()=>{
            setClickedStarIndex(item)
            reload()
          }}
        >
          <HalfStarIcon
            className={cx(styles.halfStar, {
              [styles.rightStar]: idx % 2 !== 0,
            })}
            key={"halfStar" + idx}
            fill={fillStarOfIndex(
              item,
              hoveredStarIndex === 0 ? "leave" : "enter"
            )}
            //className={styles.starIcon}
          />
        </button>
      ))}
    </div>
  );
};
export default memo(StarRateButton);
