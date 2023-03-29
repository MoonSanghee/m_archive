import React from "react";
import cx from "classnames";
import styles from "./reviewButton.module.scss";
import { ReviewWriteIcon,ReviewModifyIcon } from "../../../../../assets/icon";

const ReviewButton = ({ className, type, ...props }) => {
  return (
    <button className={cx(styles.button)} type="button" {...props}>
        {type === "write" ?<ReviewWriteIcon /> : <ReviewModifyIcon/>}
        <span className={styles.label}> {type === "write" ? "리뷰 작성" : "리뷰 수정"}</span>
    </button>
  );
};

export default ReviewButton;
