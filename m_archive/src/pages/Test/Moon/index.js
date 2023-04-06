import React, { useState } from 'react';
import {
  Input,
  SearchBox,
  TableMenu,
  TableElements,
  ServiceLNB,
  AdminLNB,
} from '../../../components';
import Movies from '../../../components/Common/TableElements/movies';
import Reviews from '../../../components/Common/TableElements/Reviews';
//import Movie from '../../Home/Carousel/Movie';
import styles from './moon.module.scss';
import Pagination from '../../../components/Common/PageNation';
import Users from '../../../components/Common/TableElements/Users';
import FAQs from '../../../components/Common/TableElements/FAQs'

const Moon = () => {
  const [isError, setIsError] = useState(false);
  const onClickButton = () => {
    setIsError(!isError);
  };
  return (
    <main className={styles.wrapper}>
      <AdminLNB className={styles.left} />
      {/* <section>
                문상희 테스트페이지
                <section className={styles.login}>
                    <button onClick={onClickButton}>버튼입니다.</button>
                    <Input label="Id" placeholder="아이디"/>
                    <Input label="password" placeholder="비밀번호" errorText={isError && "비밀번호를 다시 확인해주세요"} />
                    <Input label="password2" placeholder="비밀번호 확인" errorText={isError && "비밀번호를 다시 확인해주세요"}/>
                </section>
                // <SearchBox placeholder="검색검색" />
                <SearchBox placeholder="검색어를 입력해주세요"/>
            </section> */}
      <section className={styles.table}>
        {/* <TableMenu tableName="users" /> */}
        {/* <TableMenu tableName="reviews" /> */}
        <TableMenu tableName="F&Q" />
        {/* <TableMenu tableName="movieInfo" /> */}
        <table>
          {/* <Users limit={10}/> */}
          {/* <TableElements>
          </TableElements> */}
            {/* //NOTE: children을 사용해서 분기처리 없이 사용 */}
            {/* <Movies limit={10}/> */}
            {/* <Reviews limit={10}/> */}
            <FAQs limit={10}/>
        </table>
      </section>
    </main>
  );
};

export default Moon;

// 회원가입, 로그인시 인풋 박스들 묶어서 플렉스 정렬 넣어줄것!
// flex-grow - 비율에 따라 크기 조정
