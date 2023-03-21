import React, { memo } from "react";
import styles from "./toggle.module.scss";
import cx from "classnames";

const Toggle = ( {className, ...props}) => {

    return (
        <label className={cx(styles.wrapper, className)}>
            <input type="checkbox" hidden readOnly {...props} />
            <span role="button" className={styles.button}/>
            <span className={styles.letter1}>ON</span> 
            <span className={styles.letter2}>OFF</span>
        </label>
    );
};

export default memo(Toggle);