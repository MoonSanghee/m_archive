import React, { useCallback, useEffect, useState } from 'react';
import {
  AdminLNB,
  CheckBox,
  SearchBox,
  Button,
  TableMenu,
  TableElements,
} from '../../../components';
import styles from './manageReviews.module.scss';
import { getReviews, deleteReviewAdmin } from '../../../api/Reviews';

import reviewStyle from '../../../components/Common/TableElements/tableElements.module.scss';
import { getReviewsCount } from '../../../api/Reviews';
import Pagination from '../../../components/Common/PageNation';
import dayjs from 'dayjs';
import cx from 'classnames';
//MEMO: modal에 필요한 것들
import useModal from '../../../components/Common/Modal/useModal';
import { Modal } from '../../../components';
import EditModal from '../EditModal';

const ManageReviewsPage = () => {
  const [modalOption, showModal, onClose] = useModal();

  const [selectedReviews, setSelectedReviews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  const isAllChecked = selectedReviews.length === reviews.length;

  const onClick = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (event) => {
    const response = await getReviews(1, 10, event.target.value);
    if (response.status === 200) {
      const items = [...response.data.data];
      setReviews(items);
      setTotalPages(Math.ceil(items.length / pageLimit));
      setCurrentPage(1);
    }
    if (event.target.value === '') {
      // 검색어가 비어있는 경우
      setTotalPages(response.length / pageLimit);
      setCurrentPage(1);
      return;
    }
  };

  const onGetReviews = async () => {
    const response = await getReviews(1, 10);
    if (response.status === 200) {
      const items = [...response.data.data];
      setReviews(items);
    }
  };

  const onCheckReview = (id) => {
    return () => {
      if (selectedReviews.includes(id)) {
        setSelectedReviews(
          selectedReviews.filter((reviewId) => reviewId !== id),
        );
      } else {
        setSelectedReviews([...selectedReviews, id]);
      }
    };
  };

  const onCheckAll = () => {
    if (isChecked) {
      setSelectedReviews([]);
    } else {
      setSelectedReviews(reviews.map((review) => review.id));
    }
  };

  const onDeleteReview = () => {
    const reviewIDs = selectedReviews;
    for (const el of reviewIDs) {
      //deleteReview(el);
      onDelete(el);
    }
  };

  const onDelete = async (id) => {
    const response = await deleteReviewAdmin(id);
    if (response.status === 204) {
      alert('정상 삭제');
      onGetReviews();
    } else {
      alert('삭제 오류!');
    }
  };

  const onClickOpenModal = useCallback(
    (id, type) => {
      const item= reviews?.filter((item)=>item.id === id)[0]
      showModal(
        true,
        '',
        null,
        null,
        <EditModal
          item={item}
          type={type}
          onClose={() => {
            onClose(onGetReviews);
          }}
        />,
      );
    },
    [modalOption],
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsChecked(false);
  };

  const fetchData = async () => {
    const response = await getReviews(currentPage, pageLimit);
    const count = await getReviewsCount();
    // console.log(response)
    if (response.status === 200) {
      const items = [...response.data.data];
      setTotalPages(Math.ceil(count.data.count / pageLimit));
      setReviews(items);
    }
  };

  useEffect(() => {
    onGetReviews();
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage, pageLimit]);

  return (
    <main className={styles.wrapper}>
      <AdminLNB />
      <section className={styles.allSection}>
        <div className={styles.topMenu}>
          <span className={styles.menuLeft}>
            <CheckBox
              className={styles.check}
              checked={isChecked}
              onChange={onCheckAll}
              onClick={onClick}
              id="SelectAll"
            />
            전체선택
          </span>
          <span className={styles.menuRight}>
            <Button width={'long'} color={'secondary'} onClick={onDeleteReview}>
              선택 삭제
            </Button>
            <Button
            className={styles.editBtn}
            width={'long'}
            color={'secondary'}
            onClick={() => {
              if(selectedReviews.length ===1 ) onClickOpenModal(selectedReviews[0], 'review');}
            }
            >수정</Button>
            <SearchBox
              className={styles.SearchBox}
              placeholder="영화제목, 작성자"
              onChange={handleSubmit}
            />
          </span>
        </div>
        <p className={styles.secondMenu}>
          <TableMenu tableName="reviews" />
        </p>
        <p className={styles.table}>
          <div>
            <table className={reviewStyle.reviews}>
              {reviews.map((review, idx) => {
                const createdAt = review.createdAt;
                return (
                  <td key={idx} className={reviewStyle.elements}>
                    <CheckBox
                      className={reviewStyle.check}
                      checked={selectedReviews.includes(review.id)}
                      onChange={onCheckReview(review.id)}
                    />
                    <span id="영화">{review.movie.title}</span>
                    <span>{review.user.name}</span>
                    <span>{review.likeCount}</span>
                    <span>
                      {dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}
                    </span>
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
        </p>
      </section>
      <Modal modalOption={modalOption} modalSize="small" />
    </main>
  );
};

export default ManageReviewsPage;
