import { useEffect, useState } from 'react';
import { useEffectOnce, useMount, useUnmount } from 'react-use';
import styles from './reviewModal.module.scss';
import { Button } from '../../../../components/Common';
import cx from 'classnames';
import {
  createReview,
  deleteReview,
  modifyReview,
} from '../../../../api/Reviews';

const checkResponse = (status, text, code) => {
  if (status === code) {
    alert(`리뷰가 ${text}되었습니다.`);
  } else {
    alert(`리뷰${text} 오류`);
  }
};

const ReviewModal = ({ title, isEmptyReview, movieId, myReview, onClose }) => {
  const [content, setContent] = useState('');
  const [isModified, setIsModified] = useState(false);
  //const [isDeleted, setIsDeleted] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const reviewData = {
      content: content,
      score: 0,
      //지금은 null값이 안돼서
    };
    if (isModified) {
      //리뷰 수정
      //NOTE: 수정 -> 204
      const response = await modifyReview(myReview.id, reviewData);
      //NOTE: 반복되는 코드는 함수로 분리
      checkResponse(response.status, '수정', 204);
    } else {
      //리뷰 생성
      const response = await createReview(movieId, reviewData);
      //NOTE: 생성 -> 201
      checkResponse(response.status, '생성', 201);
    }

    onClose();
  };
  //NOTE: GET -> 200, POST -> 201, PATCH -> 204, DELETE -> 204
  const onDelete = () => {
    //NOTE: 삭제는 따로 분리
    //NOTE: 삭제 -> 204
    //   const response = await deleteReview(myReview.id);
    //   if (response.status === 200) {
    //     alert('리뷰가 삭제되었습니다.');
    //   } else {
    //     alert('리뷰삭제 오류');
    //   }
  };

  const onChange = (e) => {
    const { value } = e.currentTarget;
    setContent(value);
  };

  //NOTE: react-use
  //NOTE: 리뷰 모달이 생성될 때 작동하는 라이프 사이클
  useMount(() => {
    if (!isEmptyReview) {
      setContent(myReview.content);
      setIsModified(true);
    }
  });

  //NOTE: 리뷰 모달이 사라질 때 작동하는 라이프 사이클
  // useUnmount(() => {});

  //NOTE: deps가 변할 때 딱 1번만 실행
  // useEffectOnce(() => {}, [isEmptyReview]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h1>{title}</h1>
      </div>
      <form id="reviewForm" onSubmit={onSubmit} className={styles.formWrapper}>
        <textarea
          //type="text"
          name="content"
          className={cx(styles.reviewContent)}
          value={content}
          onChange={onChange}
        />

        {/* //NOTE: position fixed */}
        <div className={styles.btnWrapper}>
          <Button color={'secondary'} type="submit" form="reviewForm">
            {!isModified ? '저장' : '수정'}
          </Button>
          {isModified && (
            <Button
              color={'gray'}
              type="button"
              onClick={onDelete}
              form="reviewForm"
            >
              삭제
            </Button>
          )}
        </div>
      </form>
    </section>
  );
};

export default ReviewModal;
