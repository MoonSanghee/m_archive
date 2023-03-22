import React, { memo } from "react";
import cx from "classnames";
import styles from "./checkbox2.module.scss";
import { IconCheck2 } from "../../../assets/icon";


const CheckBox2 = ({className, ...props}) => {
    return (
        <label className={cx(styles.wrapper, className)}>
            <input type="checkbox" readOnly hidden {...props}/>
            <IconCheck2/>
        </label>
    )
}

export default memo(CheckBox2);