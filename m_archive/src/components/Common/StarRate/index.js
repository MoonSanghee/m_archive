import { useState, useEffect } from "react";
import styles from "./star.module.scss";
import Star from "./Star";

const STAR_WIDTH = 38;

const StarRate = ({item}) =>  {
    const RATE = item.score;
    const ID= item.name+item.id;
    //console.log(item);
    
    const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last'];
    const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
    const calcStarRates = () => {
        let tempStarRatesArr = [0, 0, 0, 0, 0];
        let starVerScore = (RATE * STAR_WIDTH);
        let idx = 0;
        while (starVerScore > STAR_WIDTH) {
            tempStarRatesArr[idx] = STAR_WIDTH;
            idx += 1;
            starVerScore -= STAR_WIDTH;
        }
        tempStarRatesArr[idx] = starVerScore;
        return tempStarRatesArr;
    };

    useEffect(() => {
        setRatesResArr(calcStarRates)
    }, []);

    return (
        <div className={styles.wrapper} id={`StarsWrapper-${ID}`}>
            {STAR_IDX_ARR.map((itm, idx) => {
                return (
                <Star key={'STAR'+ID+idx} ID={ID+idx} item={itm} index={idx}  ratesResArr={ratesResArr}/>     
                )
            })
            }
        </div>
    )
}

export default StarRate;

