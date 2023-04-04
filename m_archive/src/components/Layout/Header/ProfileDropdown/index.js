import React from "react";
import cx from "classnames";
import styles from "./profileDropdown.module.scss";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
//import { ProfileIcon } from "../../../../assets/icon";
import ProfileIcon from "../ProfileIcon";
import { useMe } from "../../../../hooks";
import { Button } from "../../../Common";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({ items, onClick }) => {
  const ref = useRef(null);
  const me = useMe();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);


  const onClickIcon = () => {
      setIsOpen(!isOpen);
  };
  const onClickLogin = ()=>{
      navigate("/login");
  }
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
        {me ? (<ProfileIcon
          ref={ref}
          onClick={onClickIcon}
          className={cx(styles.icon, { [styles.isOpen]: isOpen })}
        />) :
        ( <Button onClick={onClickLogin} className={styles.button} border={"border"}  >로그인</Button>)
        }
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
