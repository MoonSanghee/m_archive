import React, { memo, useState,useEffect } from "react";
import styles from "./toggle.module.scss";
import cx from "classnames";

const Toggle = ( {className,checked, onChange,...props}) => {
    const [isChecked, setIsChecked] = useState(false);
    useEffect(()=>{
        setIsChecked(checked);
    },[checked]);
    return (
        <label className={cx(styles.wrapper, className)}>
            <input type="checkbox" hidden checked={isChecked} onChange={onChange}  {...props} />
            <span role="button" className={styles.button}/>
            <span className={styles.letter1}>ON</span> 
            <span className={styles.letter2}>OFF</span>
        </label>
    );
};

export default memo(Toggle);