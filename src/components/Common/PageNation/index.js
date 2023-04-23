import React, { useMemo } from 'react';
import styles from './pagenation.module.scss';
//import { range } from 'lodash-es';
import { First, Last } from '../../../assets/icon';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

  const pageNumbers = [];

  //NOTE: 추후에 리팩토링을 해볼 여지가 있는 코드
  // const pageNumbers2 = useMemo(() => {
  //   if (totalPages <= 5) {
  //     return range(1, totalPages + 1);
  //   } else if (currentPage <= 3) {
  //     return range(1, 6);
  //     //NOTE: [1,2,3,4,5]
  //   } else if (currentPage >= totalPages - 2) {
  //     return range(totalPages - 4, totalPages + 1);
  //     //NOTE: [totalPages-4, totalPages-3, totalPages-2, totalPages-1, totalPages]
  //   } else {
  //     return range(currentPage - 2, currentPage + 3);
  //     //NOTE: [currentPage-2, currentPage-1, currentPage, currentPage+1, currentPage+2]
  //   }
  // }, [currentPage, totalPages]);

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else if (currentPage <= 3) {
    pageNumbers.push(1, 2, 3, 4, 5);
  } else if (currentPage >= totalPages - 2) {
    pageNumbers.push(
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    );
  } else {
    pageNumbers.push(
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    );
  }

  const handlePageChange = (page) => {
    console.log(page)
    if (onPageChange) {
      onPageChange(page);
    }
  };
  return (
    <div className={styles.pagenation}>
      <button onClick={() => handlePageChange(1)}>
        <First />
      </button>
      <button
        className={styles.move}
        onClick={() => handlePageChange(prevPage)}
      >
        {'<'}
      </button>
      <div className={styles.pages}>
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={currentPage === page ? styles.active : ''}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className={styles.move}
        onClick={() => handlePageChange(nextPage)}
      >
        {'>'}
      </button>
      <button onClick={() => handlePageChange(totalPages)}>
        <Last />
      </button>
    </div>
  );
};

export default Pagination;
