import { useState, useEffect } from "react";
import styles from "./star.module.scss";
import Star from "./Star";

const STAR_WIDTH = 40;

const StarRate = ({item}) =>  {
    const RATE = item.rate;
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
                <Star key={item.name+itm.id+idx} ID={ID} item={itm} idx={idx}  ratesResArr={ratesResArr}/>     
                )
            })
            }
        </div>
    )
}

export default StarRate;

