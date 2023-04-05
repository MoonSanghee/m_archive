import React, { useState, useEffect } from 'react';
import styles from './tableElements.module.scss';
import CheckBox from '../CheckBox';
import { getReviews, getReviewsCount } from '../../../api/Reviews';
import { getMovie } from '../../../api/Movies';

const Reviews = ({ page, limit }) => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit] = useState(limit);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    const response = await getReviews(currentPage, pageLimit);
    const count = await getReviewsCount();
    if (response.status === 200) {
      const items = [...response.data.data];
      setTotalPages(Math.ceil(count.data.count / pageLimit));
      setReviews(items);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageLimit]);

  return (
    <table>
      {reviews.map((review) => {
        return (
          <td className={styles.elements}>
            <span id="영화">제목</span>
            <span>{review.user.name}</span>
            <span>{review.likeCount}</span>
            <span>{review.createdAt}</span>
          </td>
        );
      })}
    </table>
  );
};

export default Reviews;
