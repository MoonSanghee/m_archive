import { useState, useEffect } from "react";
import styles from "./star.module.scss";


const StarRate = ({item}) =>  {
    let RATE = item.rate;
    let ID= item.name+item.id;
    const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last'];
    const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
    
    const calcStarRates = () => {
        let tempStarRatesArr = [0, 0, 0, 0, 0];
        let starVerScore = (RATE * (40*5)) / 5;
        let idx = 0;
        while (starVerScore > 40) {
            tempStarRatesArr[idx] = 40;
            idx += 1;
            starVerScore -= 40;
        }
        tempStarRatesArr[idx] = starVerScore;
        return tempStarRatesArr;
    };

    useEffect(() => {
        setRatesResArr(calcStarRates)
    }, [])
    return (
        <div className={styles.wrapper} id={item.name+item.id}>
            {STAR_IDX_ARR.map((itm, idx) => {
                return (
                <span className={styles.star_icon} key={`${ID}-${itm}_${idx}`}>
                        <svg width="40" height="38" viewBox="0 0 40 38" fill="#ccc" xmlns="http://www.w3.org/2000/svg">
                            <clipPath id={`${ID}-${itm}StarClip`}>
                                <rect width={`${ratesResArr[idx]}`} height='38' />
                            </clipPath>
                            
                            <path id={`${ID}-${itm}Star`} 
                               d="M20 30.54L32.36 38L29.08 23.94L40 14.48L25.62 13.24L20 0L14.38 13.24L0 14.48L10.9 23.94L7.64 38L20 30.54Z"
                                transform='translate(-2 -2)'
                            />
                            <use clipPath={`url(#${ID}-${itm}StarClip)`} href={`#${ID}-${itm}Star`} fill="#FCE22A"
                            />
                        </svg>
                        
                       

                </span>)
            })
            }
        </div>
    )
}

export default StarRate;

