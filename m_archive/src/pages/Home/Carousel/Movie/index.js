import React from "react";
import styles from "./movie.module.scss";
import { Card } from "../../../../components/Common";

const Movie = ({ movie, slide }) => {
    //const { id, name, release_date, image_url } = movie;
    const { id } ={ movie } ;

    return (
        <li
            className={styles.movie}
            id={`MovieCard-${id}`}
            style={{
            transform: `translateX(${slide}px)`,
            transition: "0.5s ease",
            }}
        >
            <Card id={`Card-${id}`} item={movie}/>
        </li>
      )
    }
export default Movie;