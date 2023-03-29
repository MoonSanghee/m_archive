import React, { useEffect, useState } from "react";
import styles from "./reviewCarousel.module.scss";
import { ChevronArrow } from "../../../../assets/icon";
import { useNavigate } from "react-router-dom";
//import ReviewCard from "../../../../components/Common/ReviewCard";
import Review from "./Review";
import { EclipseIcon } from "../../../../assets/icon";
import cx from "classnames";
/**
 * items - 캐러셀 안에 들어갈 아이템배열
 *
 */

//NOTE: hook -> state -> 함수 -> useEffect

const ReviewCarousel = ({ reviews, type }) => {
    const navigate = useNavigate();
    //ReviewCardWrapper크기알아야함!!
    const [slidePx, setSlidePx] = useState(0);
    //const [movePx, setMovePx] = useState(0);
    //const [moveCount, setMoveCount] = useState(4);
    //console.log({movies});
    const [position,setPosition] = useState(0);

    const onNavigateDetail = (id) => {
        return () => {
        //MEMO: navigate를 할 때는 /가 있어야 함
        navigate(`/movies/detail/${id}/reviews`);
        };
    };

    /*
    const toPrev = () => {
        //card width - 1712 , homepage padding-48
        slidePx < 0 && setSlidePx(slidePx + movePx);
    };

    const toNext = () => {
        //card width - 1712 , homepage padding-48 , li gap - 8
        slidePx > -(movePx * moveCount) && setSlidePx(slidePx - movePx);
    };
    */
    const onMove=()=>{
        setSlidePx(position * 1000);
    }
    const onClick=(idx)=>{
        setPosition(idx);
    }
    

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
                //onClick={onNavigateDetail(movie.id)}
                //type={type}
                //idx={idx}
                />
            );
            })}
        </ul>
        <div className={styles.eclipseWrapper}>
            <EclipseIcon className={cx({[styles.cliked]:position ===1 })} onClick={onClick(1)}/>
            <EclipseIcon className={cx({[styles.cliked]:position ===2 })} onClick={onClick(2)}/>
            <EclipseIcon className={cx({[styles.cliked]:position ===3 })} onClick={onClick(3)}/>
            <EclipseIcon className={cx({[styles.cliked]:position ===4 })} onClick={onClick(4)}/>
        </div>
        {/*<ChevronArrow className={styles.nextBtn} onClick={toNext} />*/}
        </section>
    );
    };

    export default ReviewCarousel;
