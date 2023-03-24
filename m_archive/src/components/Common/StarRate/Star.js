import React from "react";
import cx from "classnames";
import styles from "./star.module.scss";
const Star = ({ID,item,idx ,ratesResArr}) =>{
    return(
        <span className={styles.star_icon} id={`${ID}-${item}-${idx}`} >
        <svg width="40" height="38" viewBox="0 0 40 38" fill="#ccc" xmlns="http://www.w3.org/2000/svg">
            <clipPath id={`${ID}-${item}StarClip`}>
                <rect width={`${ratesResArr[idx]}`} height='38' />
            </clipPath>
            
            <path id={`${ID}-${item}Star`} 
            d="M20 30.54L32.36 38L29.08 23.94L40 14.48L25.62 13.24L20 0L14.38 13.24L0 14.48L10.9 23.94L7.64 38L20 30.54Z"
                transform='translate(-2 -2)'
            />
            <use clipPath={`url(#${ID}-${item}StarClip)`} href={`#${ID}-${item}Star`} fill="#FCE22A"
            />
        </svg>
    </span>
    )

}

export default Star;