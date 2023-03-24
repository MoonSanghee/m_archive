import React from "react";
import cx from "classnames";
import styles from "./lnb.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import myPageExamples from "./myPageExamples";

//NOTE:  MyPageLNB / ServiceLNB
const LNB2 = () => {
  const navigate = useNavigate();

  const onClick = (item) => {
    return () => {
      navigate(item.path);
    };
  };

  return (
    <section className={styles.lnb}>
      <menu className={styles.menu}>
        <h2 className={styles.pageInfo}>My Page</h2>
        <section>
          {myPageExamples.map((item) => {
            return (
              <li className={styles.example} onClick={onClick(item)}>
                <span>{item.name}</span>
              </li>
            );
          })}
        </section>
        <div className={styles.logout}>로그아웃</div>
      </menu>
    </section>
  );
};

export default LNB2;
