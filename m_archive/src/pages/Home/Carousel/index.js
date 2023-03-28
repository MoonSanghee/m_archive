import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import styles from "./carousel.module.scss";
import { Card } from "../../../components/Common";
import { ChevronArrow } from "../../../assets/icon";
import { useNavigate } from "react-router-dom";



/**
 * items - 캐러셀 안에 들어갈 아이템배열
 * 
 */


const Carousel = ({ movies,type }) => {
    const [slidePx, setSlidePx] = useState(0);
    const [movePx, setMovePx] = useState(0);
    const [moveCount,setMoveCount]  = useState(0);
    //console.log({movies});
    const navigate = useNavigate();

    useEffect(()=>{
        if(type==="top10"){
            setMovePx(1712 + 40);
            setMoveCount(1);
        }else if(type==="recommend"){
            setMovePx(1712 + 40);
            setMoveCount(2);
        }
        /*else if(type==="reviews"){
            //reviews는 따로빼는게 나을듯!
        }*/
    },[]);
    const onNavigateDetail = (id) => {
        return () => {
          //MEMO: navigate를 할 때는 /가 있어야 함
          navigate(`/home/detail/${id}`);
        };
      };
    const toPrev = () => {
        //card width - 1712 , homepage padding-48
        slidePx < 0 && setSlidePx(slidePx + movePx);
    };

    const toNext = () => {
        //card width - 1712 , homepage padding-48 , li gap - 8
        slidePx > - (movePx * moveCount)  && setSlidePx(slidePx - movePx);
    };
    if (!movies) return;
    return (
        <section className={styles.wrapper}>
            <ChevronArrow 
            className={styles.prevBtn}
            onClick={toPrev}
            />
            <ul className={styles.ulWrapper}>
                {movies.map((movie,idx) => {
                    return(
                        <Movie 
                            slide={slidePx} 
                            key={`Movie-${movie.id}`} 
                            movie={movie} 
                            onClick={onNavigateDetail(movie.id)}
                            type={type}
                            idx={idx}
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