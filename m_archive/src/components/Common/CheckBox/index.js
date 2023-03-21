import React, {memo} from "react";
import cx from "classnames";
import {IconCheck} from "../../../assets/icon";
import styles from "./checkbox.module.scss";

const Checkbox = ({className, ...props}) => {
    return (
        <label className={cx(styles.wrapper, styles.wrapper2, className)}>
            <input type="checkbox" readOnly hidden {...props} />
            <IconCheck/>
        </label>
    );
};

export default memo(Checkbox);