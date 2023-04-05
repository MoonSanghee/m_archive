import React, {memo, useState} from "react";
import cx from "classnames";
import {IconCheck, IconCheck2} from "../../../assets/icon";
import styles from "./checkbox.module.scss";

const Checkbox = ({className, check, iconColor, ...props}) => {
    const isWhite = iconColor === "white";

    return (
        <label className={cx(styles.wrapper, className, {
            [styles.check]: check === "check" || isWhite,
        })}
        >
            <input type="checkbox" readOnly hidden {...props}/>
            {isWhite ? <IconCheck2/> : <IconCheck/>}
        </label>
    );
};

export default memo(Checkbox);