import React from "react";
import cx from "classnames";
import styles from "./detailButton.module.scss";

const DetailButton = ({ className, children, ...props }) => {
  return (
    <button className={cx(styles.button)} type="button" {...props}>
      {children}
    </button>
  );
};

export default DetailButton;
