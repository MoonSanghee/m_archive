import React from "react";
import cx from "classnames";
import styles from "./reviewButton.module.scss";
import { ReviewWriteIcon,ReviewModifyIcon } from "../../../../../assets/icon";

const ReviewButton = ({ className, label, ...props }) => {
  return (
    <button className={cx(styles.button)} type="button" {...props}>
        {label === "리뷰 작성" ?<ReviewWriteIcon /> : <ReviewModifyIcon/>}
        <span className={styles.label}> {label}</span>
    </button>
  );
};

export default ReviewButton;
