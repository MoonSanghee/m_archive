import React, { useState, useEffect } from 'react';
import styles from './tableElements.module.scss';
import CheckBox from '../CheckBox';
import { getReviews, getReviewsCount } from '../../../api/Reviews';
import { getMovie } from '../../../api/Movies';
import Pagination from '../PageNation';
import dayjs from 'dayjs';

const Reviews = ({ page, limit }) => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(limit);
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
    <div>
      <table className={styles.reviews}>
        {reviews.map((review) => {
          const createdAt = review.createdAt
          return (
            <td className={styles.elements}>
              <CheckBox
                className={styles.check}
                // checked={selectedMovies.includes(movie.id)}
                // onChange={onCheckMovie(movie.id)}
                />
              <span id="영화">제목</span>
              <span>{review.user.name}</span>
              <span>{review.likeCount}</span>
              <span>{dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
            </td>
          );
        })}
      </table>
      <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Reviews;
