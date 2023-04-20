import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import styles from './lnb.module.scss';
import { useNavigate } from 'react-router-dom';
import boExamples from './boExamples';

const AdminLNB = ({ path, ...props }) => {
  const navigate = useNavigate();
  
  const onClick = (item) => {
    return () => {
      navigate(item.path);
    };
  };

  return (
    <section className={styles.lnb}>
      <menu className={styles.menu}>
        {boExamples.map((item) => {
          return (
            <li
              className={cx(styles.example,{[styles.current]:path === item.path})}
              onClick={onClick(item)}
              key={item.id}
            >
              <span>{item.name}</span>
            </li>
          );
        })}
      </menu>
    </section>
  );
};

export default AdminLNB;
