import React, { useState, useEffect } from 'react';
import styles from './scrolltopbutton.module.scss';
import { ScrollTopIcon } from '../../../assets/icon';

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const ShowButtonClick = () => {
      if (window.scrollY > 0) {
        //1200
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', ShowButtonClick);
    return () => {
      window.removeEventListener('scroll', ShowButtonClick);
    };
  }, []);

  return (
    <>
      {showButton && (
        <div>
          <ScrollTopIcon onClick={scrollTop} className={styles.button} />
        </div>
      )}
    </>
  );
};

export default TopButton;
