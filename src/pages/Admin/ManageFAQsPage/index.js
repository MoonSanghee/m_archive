import React, { useCallback, useEffect, useState } from 'react';
import {
  AdminLNB,
  Button,
  CheckBox,
  Modal,
  SearchBox,
} from '../../../components';
import styles from './manageFAQ.module.scss';
import { useNavigate } from 'react-router-dom';
import { deleteFaqAdmin, getFAQs } from '../../../api/FAQ';
import { countMovies } from '../../../api/Movies';
import { useMount } from 'react-use';
import { getTokens } from '../../../utils';
import tableStyle from '../tableStyle.module.scss';
import Pagination from '../../../components/Common/PageNation';
import dayjs from 'dayjs';
import {EditModal,TableMenu} from "../_shared"
import useModal from '../../../components/Common/Modal/useModal';
import { useLocation } from 'react-router-dom';
import {useMe} from "../../../hooks";

const ManageFAQsPage = () => {
  const me = useMe();
  const path = useLocation();
  const navigate = useNavigate();
  const [modalOption, showModal,onClose] = useModal();
  const [selectedFaqs, setSelectedFaqs] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [isReversed, setIsReversed] = useState('asc');
  const [isOrderBy, setIsOrderBy] = useState('USERNAME');
  const [keyword, setKeyword] = useState('')

  const isAllChecked = selectedFaqs.length === faqs.length;

  const onClick = () => {
    setIsChecked(!isChecked);
  };

  const onClickLogout = () => {
    localStorage.clear();
    navigate('/admin/login');
  };

  const onChangeSearch = async (event) => {
    setKeyword(event.target.value)
    const response = await getFAQs(
      1,
      10,
      event.target.value,
      isOrderBy,
      isReversed,
    );
    if (response.status === 200) {
      const items = [...response.data.data];
      // NOTE: response.data.paging.total => 총 개수
      setFaqs(items);
      setTotalPages(Math.ceil(response.data.paging.total / pageLimit));
      setCurrentPage(1);
    }
    if (event.target.value === '') {
      setTotalPages(Math.ceil(response.data.paging.total / pageLimit));
      setCurrentPage(1);
      return;
    }
  };

  const onGetFaqs = async () => {
    const response = await getFAQs(currentPage, 10, keyword, isOrderBy, isReversed);
    if (response.status === 200) {
      const items = [...response.data.data];
      setFaqs(items);
    }
  };

  const onCheckFaq = (id) => {
    return () => {
      if (selectedFaqs.includes(id)) {
        setSelectedFaqs(selectedFaqs.filter((faqId) => faqId !== id));
      } else {
        setSelectedFaqs([...selectedFaqs, id]);
      }
    };
  };

  const onCheckAll = () => {
    if (isChecked) {
      setSelectedFaqs([]);
    } else {
      setSelectedFaqs(faqs.map((faq) => faq.id));
    }
  };

  const onDeleteFaq = () => {
    const faqIDs = selectedFaqs;
    for (const el of faqIDs) {
      onDelete(el);
    }
    alert("삭제 성공!");
  };

  const onDelete = async (id) => {
    const response = await deleteFaqAdmin(id);
    if (response.status === 204) {
      onGetFaqs();
    } else {
      alert('삭제 오류!');
    }

  };

  const onClickOpenModal = useCallback(
    (item, type) => {
      showModal(
        true,
        '',
        null,
        null,
        <EditModal
          item={item}
          type={type}
          onClose={() => {
            onClose(()=>{
              onGetFaqs();
            })
          }}
        />,
      );
    },
    [modalOption,onGetFaqs],
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    const response = await getFAQs(
      currentPage,
      pageLimit,
      keyword,
      isOrderBy,
      isReversed,
    );

    if (response.status === 200) {
      const items = [...response.data.data];

      setIsChecked(false);
      setSelectedFaqs([]);
      setTotalPages(Math.ceil(response.data.paging.total / pageLimit));
      setFaqs(items);
      //NOTE: response.data.paging.total === 10 => 나누면 1이 나오는데 1이 되면 2페이지까지 보일 수 있게 설정이 되므로, -1을 해주면 됩니다.
    }
  };

  const orderBy = async (item) => {
    setIsOrderBy(item.id);
    setIsReversed((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  useEffect(() => {
    onGetFaqs();
  }, []);
  
  useEffect(() => {
    async function fetchData() {
      const response = await getFAQs(currentPage, pageLimit, keyword, isOrderBy, isReversed);
      setFaqs(response.data.data);
      setCurrentPage(currentPage);
    }
    fetchData();
  }, [isOrderBy, isReversed]);

  useEffect(() => {
    fetchData();
  }, [currentPage, pageLimit]);
  useEffect(()=>{
    if(me?.userType === "USER"){
      alert("권한 없음");
      onClickLogout();
    }
  },[me]);
  useMount(() => {
    if (!getTokens().accessToken) navigate('/admin/login');
  });

  return (
    <main className={styles.wrapper}>
      <AdminLNB path={path.pathname}/>
      <section className={styles.allSection}>
        <div className={styles.header}>
        <span className={styles.adminInfo}>{me ? `관리자 : ${me?.name} 님` : ""}</span>
          <Button
            color="secondary"
            width="short"
            children={'로그아웃'}
            onClick={onClickLogout}
          />
        </div>
        <p className={styles.topMenu}>
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
            <Button width={'long'} color={'secondary'} onClick={onDeleteFaq}>
              삭제
            </Button>
            <SearchBox
              className={styles.searchBox}
              placeholder="유저이름"
              onChange={onChangeSearch}
            />
          </span>
        </p>
        <p className={styles.secondMenu}>
          <TableMenu info={faqs} tableName="F&Q" onClick={orderBy} />
        </p>
        <p className={styles.table}>
          <div>
            <table className={tableStyle.table}>
              {faqs.map((faq, idx) => {
                return (
                  <li key={faq.id} className={tableStyle.elements}>
                    <CheckBox
                      className={tableStyle.check}
                      checked={selectedFaqs.includes(faq.id)}
                      onChange={onCheckFaq(faq.id)}
                    />
                    <span>{faq.title}</span>
                    <span>
                      {faq.user.name ?? '-'}({faq.user.nickname ?? '-'})
                    </span>
                    <span>{faq.content}</span>
                    <span>
                      {dayjs(faq.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                    </span>
                    <span></span>
                    <Button
                      className={styles.editBtn}
                      // children="답변하기"
                      width={'short'}
                      // color={'secondary'}
                      color={!faq.faqComment ? "secondary" : "gray"}
                      onClick={() => onClickOpenModal(faq, 'faq')}
                    >
                      {/* {faq.faqComments.length === 0 ? '답변하기' : '답변완료'} */}
                      {!faq.faqComment ? '답변하기' : '답변완료'}
                    </Button>
                  </li>
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
      <Modal modalOption={modalOption} modalSize="small" onClose={onClose}/>
    </main>
  );
};

export default ManageFAQsPage;
