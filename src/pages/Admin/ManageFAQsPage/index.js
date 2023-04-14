import React, { useEffect, useState } from 'react';
import {
  AdminLNB,
  Button,
  CheckBox,
  SearchBox,
  TableElements,
  TableMenu,
} from '../../../components';
import styles from './manageFAQ.module.scss';
import FAQs from '../../../components/Common/TableElements/FAQs';
import { useNavigate } from 'react-router-dom';
import { deleteFaqAdmin, getFAQs } from '../../../api/FAQ';
import { countMovies } from '../../../api/Movies';
import { useMount } from 'react-use';
import { getTokens } from '../../../utils';
import faqStyle from "../../../components/Common/TableElements/tableElements.module.scss";
import Pagination from '../../../components/Common/PageNation';

const ManageFAQsPage = () => {
  const navigate = useNavigate();
  const [selectedFaqs, setSelectedFaqs] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [isReversed, setIsReversed] = useState("asc");
  const [isOrderBy, setIsOrderBy] = useState("NAME");

  const isAllChecked = selectedFaqs.length === faqs.length;

  const onClick = () => {
    setIsChecked(!isChecked);
  };

  const onClickLogout = ()=>{
    localStorage.clear();
    navigate("/admin/login");
  }

  const onChangeSearch = async (event) => {
    const response = await getFAQs(1, 10, event.target.value);
    if (response.status === 200) {
      const items = [...response.data.data];
      setFaqs(items);
      setTotalPages(Math.ceil(items.length / pageLimit));
      setCurrentPage(1);
    }
    if (event.target.value === "") {
      setTotalPages(response.length / pageLimit);
      setCurrentPage(1);
      return;
    }
  };

  const onGetFaqs = async () => {
    const response = await getFAQs(1, 10, "", isOrderBy, isReversed);
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
  };

  const onDelete = async (id) => {
    // api 맞나 모르겠슴다
    const response = await deleteFaqAdmin(id);
    if (response.status === 204) {
      alert("정상 삭제");
      onGetFaqs();
    } else {
      alert("삭제 오류!");
    }
  };
  
  useEffect(() => {
    onGetFaqs();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    const response = await getFAQs(currentPage, pageLimit, "", isOrderBy, isReversed);

    // FAQ 카운트 요청드리고나서 수정 
    // const count = await countMovies();

    if (response.status === 200) {
      const items = [...response.data.data];

      setIsChecked(false);
      setSelectedFaqs([]);

      setTotalPages(Math.ceil(count.data.count / pageLimit));
      setFaqs(items);
    }
  };

  const orderBy = async (item) => {
    setIsOrderBy(item.id);
    setIsReversed((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getFAQs(1, pageLimit, "", isOrderBy, isReversed);
      setFaqs(response.data.data);
      setCurrentPage(1);
    }
    fetchData();
  }, [isOrderBy, isReversed]);

  useEffect(() => {
    fetchData();
  }, [currentPage, pageLimit]);

  useMount(() => {
    if(!getTokens().accessToken) navigate("/admin/login");
  })

  return (
    <main className={styles.wrapper}>
      <AdminLNB />
      <section className={styles.allSection}>
        <div className={styles.header}><Button color="secondary" width="long" children={"로그아웃"} onClick={onClickLogout}/></div>
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
            <Button 
              width={"long"}
              color={"secondary"}
              onClick={onDeleteFaq}
            >
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
          <TableMenu 
            info={faqs}
            tableName="F&Q" 
            onClick={orderBy}/>
        </p>
        <p className={styles.table}>
          <div>
            <table className={faqStyle.faqs}>
              {faqs.map((faq, idx) => {
                const createdAt = faq.createdAt;
                return (
                  <li key={idx} className={faqStyle.elements}>
                    <CheckBox
                      className={faqStyle.check}
                      checked={selectedFaqs.includes(faq.id)}
                      onChange={onCheckFaq(faq.id)}
                    />                    
                    <span>{faq.title}</span>
                    <span>{faq.user.name ?? "-"}({faq.user.nickname ?? "-"})</span>
                    <span>{faq.content}</span>
                    <span>{dayjs(time).format('YYYY-MM-DD HH:mm:ss')}</span>
                  </li>
                )
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

export default ManageFAQsPage;
