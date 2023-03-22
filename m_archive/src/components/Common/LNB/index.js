import React from "react";
import cx from 'classnames';
import styles from './lnb.module.scss';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LNB = () => {
  const navigate = useNavigate();

  const onClick = (item) => {
    return () => {
      navigate(item.path)
    };
  };

  const examples = [
    {
      id: 1,
      name: '영화관리',
      value: 'Movies',
      path: '/ManageMoviesPage'
    },
    {
      id: 2,
      name: '리뷰관리',
      value: 'Reviews',
      path: '/ManageReviewsPage'
    },
    {
      id: 3,
      name: '유저관리',
      value: 'Users',
      path: '/ManageUsersPage'
    },
    {
      id: 4,
      name: 'FAQ',
      value: 'movies',
      path: '/ManageFAQsPage'
    },
  ]
  return (
    <section className={styles.lnb}>
      <menu className={styles.menu}>
        {examples.map((item) => {
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