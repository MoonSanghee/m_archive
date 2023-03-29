import React from "react";
import styles from "./home.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getMovies, getTop10Movies } from "../../api/Movies";
import { useState, useEffect } from "react";
import Carousel from "./Carousel";

const Home = () => {
  //const navigate = useNavigate();
  const [top10Movies, setTop10Movies] = useState([]);
  const [movies, setMovies] = useState([]);
  //const [searchText, setSearchText] = useState("");

  const onGetMovies = async () => {
    //서버에서 데이터를 불러옴.
    const response = await getMovies();

    if (response.status === 200) {
      //console.log(response.data.data);
      const items = [...response.data.data];
      //console.log("items",items);
      setMovies(items);
    }
  };
  const onGetTop10Movies = async () => {
    const response = await getTop10Movies();

    if (response.status === 200) {
      //console.log(response.data.data);
      const items = [...response.data.data];
      //console.log("items",items);
      setTop10Movies(items);
    }
  };
  useEffect(() => {
    onGetMovies();
    onGetTop10Movies();
    //setMovies(movieListTest);
  }, []);
  return (
    <main className={styles.wrapper}>
      <section className={styles.top10Wrapper}>
        <h1 className={styles.header}>Top 10</h1>
        <Carousel movies={top10Movies} type="top10" />
      </section>
      <section className={styles.rcmdWrapper}>
        <h1 className={styles.header}>M-archive 영화 추천</h1>
        <Carousel movies={movies} type="recommend" />
      </section>
      <section className={styles.genreWrapper}>
        <h1 className={styles.header}>장르</h1>
        <div></div>
      </section>
    </main>
  );
};
export default Home;
