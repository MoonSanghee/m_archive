import cx from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import styles from './profileDropdown.module.scss';
//import { ProfileIcon } from "../../../../assets/icon";
import { useNavigate } from 'react-router-dom';
import { useMe } from '../../../../hooks';
import { Button, ProfileIcon } from '../../../Common';

const ProfileDropdown = ({ items, onClick }) => {
  const ref = useRef(null);
  const me = useMe();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const onClickIcon = () => {
    setIsOpen(!isOpen);
  };
  const onClickLogin = () => {
    navigate('/login');
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

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isOpen]);

  //const Dropdown = ({className,itmes,valueKey})
  //NOTE: ref는 (우리가 따로 만들어놓은) 컴포넌트에는 사용이 안된다.
  //NOTE: ref는 html 태그에만 사용이 가능하다~
  //NOTE: forwardRef
  return (
    <div className={styles.dropdownWrapper}>
      <div className={styles.dropdownInfo}>
        {me ? (
          <ProfileIcon
            user={me}
            ref={ref}
            onClick={onClickIcon}
            className={cx(styles.icon, { [styles.isOpen]: isOpen })}
          />
        ) : (
          <Button
            onClick={onClickLogin}
            className={styles.button}
            border={'border'}
            style={{ height: '48px' }}
          >
            로그인
          </Button>
        )}
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
