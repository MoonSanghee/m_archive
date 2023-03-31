import React, { useState, useEffect } from "react";
import styles from './tableElements.module.scss';
import CheckBox from "../CheckBox";
import { getReviews } from "../../../api/Reviews"
import { getMovie } from "../../../api/Movies"


const Reviews = () => {
  const [reviews, serReviews] = useState([]);

  const getReviews = async () => {
    const response = await getReviews();
    if (response.status === 200) {
      const items = [...response.data.data];
      serReviews(items);
    }
  }

  const getMovieTitle = async (movieId) => {
    const response = await getMovie(movieId);
    if (response.status === 200) {
      const movie = response.data.data;
      return movie.title;
    }
  }

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <table>
      {reviews.map((review) => {
        return (
          <td className={styles.elements}>
            <span id="영화">{getMovieTitle(review.movie.id)}</span>
            <span>{review.user.name}</span>
            <span>{review.likeCount}</span>
            <span>{review.createdAt}</span>
          </td>
          )
      })}
    </table>
  )
}

export default Reviews