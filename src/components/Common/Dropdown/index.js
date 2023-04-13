import React, { memo, useEffect, useRef, useState } from "react";
import cx from "classnames";
import styles from "./dropdown.module.scss";
import { ChevronArrow, ChevronIcon } from "../../../assets/icon";

const Dropdown = ({ className, items, valueKey, value, onClick, color }) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const onClickDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen]);

  return (
    <div className={cx(styles.dropdownWrapper, styles[color])}>
      <div
        ref={ref}
        className={cx(styles.dropdownInfo, { [styles.isOpen]: isOpen })}
        onClick={onClickDropdown}
      >
        {color !== "secondary" ? value ?? "최신순" : value ?? "문의 종류"}
        {color !== "secondary" ? (
          <ChevronArrow
            className={cx(styles.icon, { [styles.isOpen]: isOpen })}
          />
        ) : (
          <ChevronIcon
            className={cx(styles.icon, { [styles.isOpen]: isOpen })}
          />
        )}
      </div>
      <menu className={cx(styles.itemWrapper, { [styles.isOpen]: isOpen })}>
        {items.map((item) => {
          return (
            <li
              key={item.id + item.name}
              className={cx(styles.item, styles[color])}
              onClick={onClick(item)}
            >
              {item[valueKey]}
            </li>
          );
        })}
      </menu>
    </div>
  );
};
export default memo(Dropdown);
