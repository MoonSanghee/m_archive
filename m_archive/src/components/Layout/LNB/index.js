import React from "react";
import cx from "classnames";
import styles from "./lnb.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import boExamples from "./boExamples";

//NOTE: AdminLNB

const LNB = ({ isAdmin, title, links, footer }) => {
  const navigate = useNavigate();

  const onClick = (item) => {
    return () => {
      navigate(item.path);
    };
  };

  return (
    <section className={cx(styles.lnb, { [styles.admin]: isAdmin })}>
      <menu className={styles.menu}>
        {title && <h2>{title}</h2>}
        {boExamples.map((item) => {
          return (
            <li className={styles.example} onClick={onClick(item)}>
              <span>{item.name}</span>
            </li>
          );
        })}
        {footer && <div className={styles.logout}>{footer}</div>}
      </menu>
    </section>
  );
};

export default LNB;
