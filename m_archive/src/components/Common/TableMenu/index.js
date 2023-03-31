import React, { useState } from 'react';
import CheckBox from '../CheckBox';
import styles from './tableMenu.module.scss';
import movieInfo from './movieInfo';
import reviews from './reviews';
import users from './users';
import FnQ from './FnQ';

const TableMenu = ({ tableName, ...props }) => {
  const table = {
    movieInfo: movieInfo,
    reviews: reviews,
    users: users,
    'F&Q': FnQ,
  };
  return (
    <table className={styles.header}>
      <CheckBox className={styles.check} />
      {table[tableName].map((item) => {
        return (
          <li key={item.id} className={styles.item}>
            {item.name}
          </li>
        );
      })}
    </table>
    //   <table className={styles.header}>
    //   <ul>
    //       <li>id</li>
    //       <li>name</li>
    //       <li>value</li>

    //   </ul>
    //   {movieInfo.map((item,idx) => {
    //     return (
    //       <ul key={`ul-${idx}`}>
    //           <li>{item.id}</li>
    //           <li>{item.name}</li>
    //           <li>{item.value}</li>
    //       </ul>
    //     )
    //   })}
    // </table>
  );
};

export default TableMenu;
