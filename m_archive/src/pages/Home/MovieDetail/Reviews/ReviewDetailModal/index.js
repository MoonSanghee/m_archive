import { useEffect, useState } from 'react';
import { useEffectOnce, useMount, useUnmount } from 'react-use';
import styles from './reviewDetailModal.module.scss';
import cx from 'classnames';

const ReviewDetailModal = ({review}) =>{
    return (
        <section className={styles.wrapper}>
            <div className={styles.reviewWrapper}>
                리뷰정보
            </div>
            <div className={styles.functionsWrapper}>
                좋아요댓글공유
            </div>
            <div className={styles.commentsWrapper}>
                리뷰 댓글들
            </div>
        </section>
    );
}
export default ReviewDetailModal;