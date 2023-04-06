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
import Reviews from '../../../components/Common/TableElements/Reviews';
import { getReviews } from '../../../api/Reviews';

const ManageReviewsPage = () => {
  
    const [selectedReviews, setSelectedReviews] = useState([]);
    const [reviews, setReviews] = useState([]);
    const isAllChecked = selectedReviews.length === reviews.length;

    const onGetReviews = async () => {
        const response = await getReviews(1, 10);
        if (response.status === 200) {
            const items = [...response.data.data];
            setReviews(items);
        }
    };

    const onRemoveReviews = ((id) => {
        setReviews(review => {
            return review.filter(review => review.id !== id);
        })
    })

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

    useEffect(() => {
        onGetReviews();
    }, []);

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
                onClick={onRemoveReviews}>
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
            <Reviews 
                reviews={reviews}
                selectedReviews={selectedReviews}
                onCheckReview={onCheckReview}
                limit={10} 
            />
        </p>
      </section>
    </main>
  );
};

export default ManageReviewsPage;
