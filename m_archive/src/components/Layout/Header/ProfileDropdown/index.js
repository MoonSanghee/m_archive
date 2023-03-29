import React from "react";
import cx from "classnames";
import styles from "./profileDropdown.module.scss";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { ProfileIcon } from "../../../../assets/icon";

//MEMO:
/*
ProfileDropdown: Nav바에 속해 있는 프로필아이콘을 누르면 생기는 드랍다운입니다(프로필아이콘을 포함한). 
li를 클릭하면 페이지를 이동하게 하는 드랍다운인데, 
질문 : 다른 드랍다운처럼 props로 받아와야 할 것이 있을까요? 

*/
const ProfileDropdown = ({ items, onClick }) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const onClickIcon = () => {
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
  //const Dropdown = ({className,itmes,valueKey})
  return (
    <div className={styles.dropdownWrapper}>
      <div className={styles.dropdownInfo}>
        <ProfileIcon
          ref={ref}
          onClick={onClickIcon}
          className={cx(styles.icon, { [styles.isOpen]: isOpen })}
        />
      </div>
      <menu className={cx(styles.itemWrapper, { [styles.isOpen]: isOpen })}>
        {items.map((item) => {
          return (
            <li
              key={item.id + item.name}
              className={styles.item}
              onClick={onClick(item)}
            >
              {item.icon}
              {item.name}
            </li>
          );
        })}
      </menu>
    </div>
  );
};
export default ProfileDropdown;
