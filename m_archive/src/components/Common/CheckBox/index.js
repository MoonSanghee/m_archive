import React, {memo} from "react";
import cx from "classnames";
import {IconCheck, IconCheck2} from "../../../assets/icon";
import styles from "./checkbox.module.scss";

const Checkbox = ({className, check, ...props}) => {
    return (
        <label className={cx(styles.wrapper, className, styles[check])}>
            <input type="checkbox" readOnly hidden {...props} />
            <IconCheck />
            {/* <IconCheck2/> */}
        </label>
    );
};

export default memo(Checkbox);