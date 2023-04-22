import React, { useState } from 'react';
import { CheckBox } from '../../../../components';
import styles from './tableMenu.module.scss';
import movieInfo from './movieInfo';
import reviews from './reviews';
import users from './users';
import FnQ from './FnQ';

const TableMenu = ({ onClick, tableName, ...props }) => {
  const table = {
    movieInfo: movieInfo,
    reviews: reviews,
    users: users,
    'F&Q': FnQ,
  };

  return (
    <table className={styles.header}>
      
      {table[tableName].map((item) => {
        return (
          <li 
          onClick={()=>{onClick(item)}}
          id={item.id} className={styles.item}>
            {item.name}
          </li>
        );
      })}
    </table>
  );
};

export default TableMenu;
