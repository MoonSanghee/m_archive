import React from 'react';
import cx from 'classnames';
import styles from './input.module.scss';

//NOTE: 추후에 react-hook-form과 같이 사용한다면 -> forwardRef 사용
const Input = ({ className, label, errorText, ...props }) => {
  return (
    <label
      className={cx(styles.label, className, { [styles.error]: errorText })}
    >
      {label && <p className={styles.labelText}>{label}</p>}
      <input className={styles.input} {...props} />
      {errorText && <p className={styles.errorText}>{errorText}</p>}
    </label>
  );
};

export default Input;
