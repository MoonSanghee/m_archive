import React from "react";
import cx from "classnames";
import styles from "./tag.module.scss";


const Tag = ({ className, children, width, border, color,isGenre, ...props }) => {


  return (
    <button
      className={cx(
        styles.tag,
        styles[width],
        styles[border],
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default Tag;
