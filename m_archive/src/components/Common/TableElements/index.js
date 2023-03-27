import React, { useState } from "react";
import styles from './tableElements.module.scss';
import movies from "./movies";
import CheckBox from "../CheckBox";

const TableElements = () => {
  // const [data, setData] = useState(movies);
  // const [menu, setMenu] = useState([
  //   {name: 'openingDate'},
  //   {name: 'genre'},
  // ])
  // const movies = (movies) => {
  //   setData(movies)
  // }
  return (
    <section>
      {movies.map((item) => {
        return (
          <table className={styles.body}>
            <CheckBox className={styles.check}/>
            <li className={styles.item}>{item.name}</li>
            <li className={styles.item}>{item.openingDate}</li>
            <li className={styles.item}>{item.genre}</li>
            <li className={styles.item}>{item.actor}</li>
            <li className={styles.item}>{item.staff}</li>
          </table>
          )
      })}
    </section>
  )
}

export default TableElements