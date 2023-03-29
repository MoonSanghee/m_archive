import React, { useEffect } from "react";
import { useState, memo } from "react";
import styles from "./starRateButton.module.scss";
import { HalfStarIcon } from "../../../../../assets/icon";
import cx from "classnames";

const StarRateButton = ({ myRate }) => {
  const [hoveredStarIndex, setHoveredStarIndex] = useState(0);
  const [clickedStarIndex, setClickedStarIndex] = useState(0);

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

  useEffect(() => {
    if (!!myRate) {
      setClickedStarIndex(myRate);
    }
  }, []);
  return (
    <div>
      {rates.map((item, idx) => (
        <button
          className={styles.starsButton}
          key={"btn-" + idx}
          onMouseEnter={() => setHoveredStarIndex(item)}
          onMouseLeave={() => setHoveredStarIndex(0)}
          onClick={() => {
            setClickedStarIndex(item);
            ///onClick}
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
