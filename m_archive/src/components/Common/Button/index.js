import React from "react";
import cx from "classnames";
import styles from "./button.module.scss";

const Button = ({
  className,
  children,
  width,
  border,
  color,
  isGenre,
  ...props
}) => {
  return (
    <button
      className={cx(
        styles.button,
        styles[width],
        styles[border],
        styles[color]
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
