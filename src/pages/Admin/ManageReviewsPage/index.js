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
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [modalOption, showModal, onClose] = useModal();

  const [selectedReviews, setSelectedReviews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [isReversed, setIsReversed] = useState('asc');
  const [isOrderBy, setIsOrderBy] = useState('NAME');

  const isAllChecked = selectedReviews.length === reviews.length;

  const onClick = () => {
    setIsChecked(!isChecked);
  };
  const onClickLogout = ()=>{
    localStorage.clear();
    navigate("/admin/login");
  }
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
    (item, type) => {
      // const item= reviews?.filter((item)=>item.id === id)[0]
      showModal(
        true,
        '',
        null,
        // null,
        onGetReviews,
        <EditModal
          item={item}
          type={type}
          onClose={() => {
            // onClose(onGetReviews);
            modalOption.onClose();
          }}
        />,
      );
    },
    [modalOption],
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    const response = await getReviews(currentPage, pageLimit, '', isOrderBy, isReversed);
    const count = await getReviewsCount();
    // console.log(response)
    if (response.status === 200) {
      const items = [...response.data.data];
      setIsChecked(false);
      setSelectedReviews([]);
      setTotalPages(Math.ceil(count.data.count / pageLimit));
      setReviews(items);
    }
  };

  const orderBy = async (item) => {
    setIsOrderBy(item.id);
    setIsReversed((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    console.log(item)
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getReviews(1, pageLimit, '', isOrderBy, isReversed);
      getReviews(response.data.data);
      setCurrentPage(1);
    }
    fetchData();
  }, [isOrderBy, isReversed]);

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
        <div className={styles.header}><Button color="secondary" width="long" children={"로그아웃"} onClick={onClickLogout}/></div>
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
              삭제
            </Button>
            {/* <Button
            className={styles.editBtn}
            width={'long'}
            color={'secondary'}
            onClick={() => {
              if(selectedReviews.length ===1 ) onClickOpenModal(selectedReviews[0], 'review');}
            }
            >수정</Button> */}
            <SearchBox
              className={styles.SearchBox}
              placeholder="영화제목, 작성자"
              onChange={handleSubmit}
            />
          </span>
        </div>
        <p className={styles.secondMenu}>
          <TableMenu tableName="reviews" 
          onClick={orderBy}/>
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
                    <Button 
                      className={styles.ediBtn}
                      children="수정"
                      width={"short"}
                      color={"secondary"}
                      onClick={()=>onClickOpenModal(review,"review")}
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
      <Modal modalOption={modalOption} modalSize="small" />
    </main>
  );
};

export default ManageReviewsPage;
