import React from "react";
import cx from 'classnames';
import styles from './lnb.module.scss';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import boExamples from './boExamples';

const LNB = () => {
  const navigate = useNavigate();

  const onClick = (item) => {
    return () => {
      navigate(item.path)
    };
  };

  return (
    <section className={styles.lnb}>
      <menu className={styles.menu}>
        {boExamples.map((item) => {
          return (
            <li className={styles.example} onClick={onClick(item)}>
              <span>
              {item.name}
              </span>
            </li>
          )
        })}
      </menu>
    </section>
  )
};

export default LNB;