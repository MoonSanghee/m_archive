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
//import Reviews from '../../../components/Common/TableElements/Reviews';
import { getReviews, deleteReviewAdmin } from '../../../api/Reviews';

import reviewStyle from "../../../components/Common/TableElements/tableElements.module.scss";
import { getReviewsCount } from '../../../api/Reviews';
import Pagination from '../../../components/Common/PageNation';
import dayjs from 'dayjs';
import ReviewModal from '../../Home/MovieDetail/ReviewModal';

const ManageReviewsPage = () => {
  
    const [selectedReviews, setSelectedReviews] = useState([]);
    const [reviews, setReviews] = useState([]);
    const isAllChecked = selectedReviews.length === reviews.length;

    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

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
                setSelectedReviews(selectedReviews.filter((reviewId) => reviewId !== id));
            } else {
                setSelectedReviews([...selectedReviews, id]);
            }
        }
    };

    const onCheckAll = () => {
        if (isAllChecked) {
            setSelectedReviews([]);
        } else {
            setSelectedReviews(reviews.map((review) => review.id));
        }
    }

    const onDeleteReview = () => {
      const reviewIDs = selectedReviews;
      for (const el of reviewIDs) {
        //deleteReview(el);
        onDelete(el);
      }
    }
    const onDelete = async(id) =>{
      console.log(id);
      const response = await deleteReviewAdmin(id);
      if(response.status === 204){
        alert("정상 삭제");
        onGetReviews();
      }else{
        alert("삭제 오류!");
      }
    }

    const onEditReviews = (id) => {
      return (
        console.log(id)
      );
    }

    useEffect(() => {
        onGetReviews();
    }, []);

    const handlePageChange = (page) => {
      setCurrentPage(page);
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
                checked={isAllChecked}
                onChange={onCheckAll}
            />
            전체선택
          </span>
          <span className={styles.menuRight}>
            <Button 
                width={'long'} 
                color={'secondary'} 
                onClick={onDeleteReview}>
              선택 삭제
            </Button>
            <SearchBox
              className={styles.SearchBox}
              placeholder="제목, 배우, 감독"
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
                  const createdAt = review.createdAt
                  return (
                    <td  key={idx} className={reviewStyle.elements}>
                      <CheckBox
                        className={reviewStyle.check}
                        checked={selectedReviews.includes(review.id)}
                        onChange={onCheckReview(review.id)}
                        />
                      <span id="영화">{review.title}</span>
                      <span>{review.user.name}</span>
                      <span>{review.likeCount}</span>
                      <span>{dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                      <Button
                        className={styles.editBtn}
                        children="수정"
                        width={"long"}
                        color={"secondary"}
                        // onClick={onEditReviews(review)}
                        >
                      </Button>
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
    </main>
  );
};

export default ManageReviewsPage;
