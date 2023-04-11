import React, { useEffect, useState } from "react";
import styles from "./carousel.module.scss";
import { Card } from "../../../components/Common";
import { ChevronArrow } from "../../../assets/icon";
import { useNavigate } from "react-router-dom";
import cx from "classnames";

/**
 * items - 캐러셀 안에 들어갈 아이템배열
 *
 */

//NOTE: hook -> state -> 함수 -> useEffect

const Carousel = ({ movies, type }) => {
  const navigate = useNavigate();

  const [slidePx, setSlidePx] = useState(0);
  const [movePx, setMovePx] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  //console.log({movies});

  const onNavigateDetail = (id) => {
    return () => {
      //MEMO: navigate를 할 때는 /가 있어야 함
      navigate(`/movies/detail/${id}`);
    };
  };
  const toPrev = () => {
    //card width - 1712 , homepage padding-48
    slidePx < 0 && setSlidePx(slidePx + movePx);
  };

  const toNext = () => {
    //card width - 1712 , homepage padding-48 , li gap - 8
    slidePx > -(movePx * moveCount) && setSlidePx(slidePx - movePx);
  };

  useEffect(() => {
    if (type === "top10") {
      setMovePx(1712 + 40);
      setMoveCount(1);
    } else if (type === "recommend") {
      setMovePx(1712 + 40);
      setMoveCount(2);
    }

  }, [type]);
  if (!movies) return;
  return (
    <section className={styles.wrapper}>
      <ChevronArrow className={styles.prevBtn} onClick={toPrev} />
      <ul className={styles.ulWrapper}>
        {movies.map((movie, idx) => {
          return (
                <li
                  key={`li-idx-${movie.id}`}
                  className={cx(styles.movie, styles[type])}
                  id={`Movie-Li-${movie.id}`}
                  style={{
                    transform: `translateX(${slidePx}px)`,
                    transition: '0.5s ease',
                  }}
                >
                {type === 'top10' && (
                  <p 
                  className={cx(styles.rankingWrapper, 
                  { [styles.first]: idx === 0 })}>
                    {idx + 1}
                  </p>
                )}
              <Card
                id={`Card-${movie.id}`}
                item={movie}
                onClick={onNavigateDetail(movie.id)}
                type={type}
                idx={idx}
              />
            </li>
          );
        })}
      </ul>

      <ChevronArrow className={styles.nextBtn} onClick={toNext} />
    </section>
  );
};

export default Carousel;

{/**
 <Movie
              slide={slidePx}
              key={`Movie-${movie.id}`}
              movie={movie}
              onClick={onNavigateDetail(movie.id)}
              type={type}
              idx={idx}
            />

*/}