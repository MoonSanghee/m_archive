import React from 'react';
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
const ManageFAQsPage = () => {
  const navigate = useNavigate();
  const onClickLogout = ()=>{
    localStorage.clear();
    navigate("/admin/login");
  }
  return (
    <main className={styles.wrapper}>
      <AdminLNB />
      <section className={styles.allSection}>
        <div className={styles.header}><Button color="secondary" width="long" children={"로그아웃"} onClick={onClickLogout}/></div>
        <p className={styles.topMenu}>
          <span className={styles.menuLeft}>
            <CheckBox className={styles.check} />
            전체선택
          </span>
          <span className={styles.menuRight}>
            <Button width={'long'} color={'secondary'}>
              선택 삭제
            </Button>
            <SearchBox
              className={styles.searchBox}
              placeholder="제목, 배우, 감독"
            />
          </span>
        </p>
        <p className={styles.secondMenu}>
          <TableMenu tableName="F&Q" />
        </p>
        <div className={styles.table}>
          <FAQs limit={10}/>
        </div>
      </section>
    </main>
  );
};

export default ManageFAQsPage;
