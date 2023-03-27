import React, { useState } from "react";
import Movie from "./Movie";
import styles from "./carousel.module.scss";
import { Card } from "../../../components/Common";
import { ChevronArrow } from "../../../assets/icon";


/**
 * items - 캐러셀 안에 들어갈 아이템배열
 * 
 */


const Carousel = ({ movies,type }) => {
    const [slidePx, setSlidePx] = useState(0);
    console.log({movies});
    const toPrev = () => {
        //card width - 1712 , homepage padding-48
        slidePx < 0 && setSlidePx(slidePx + 1712 + 40);
    };

    const toNext = () => {
        //card width - 1712 , homepage padding-48 , li gap - 8
        slidePx > -3472  && setSlidePx(slidePx - 1712 - 40);
    };
    if (!movies) return;
    return (
        <section className={styles.wrapper}>
            <ChevronArrow 
            className={styles.prevBtn}
            onClick={toPrev}
            />
            <ul className={styles.ulWrapper}>
                {movies.map((movie) => {
                    return(
                        <Movie 
                            slide={slidePx} 
                            key={movie.id} 
                            movie={movie} 
                        />
                );
            })}
            </ul>
    
            <ChevronArrow 
            className={styles.nextBtn}
            onClick={toNext}
            />
   
        </section>
    );
};

export default Carousel;