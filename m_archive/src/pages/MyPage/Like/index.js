import React, { useEffect, useState } from 'react';
import { Card, ScrollTopButton, Toggle } from '../../../components';
import styles from './like.module.scss';
import { createLike, getLikes } from '../../../api/Movies';
import {useRecoilState, } from "recoil";
import { meState} from '../../../recoil';
import { useNavigate } from 'react-router-dom';
import { getMe,modifyUser } from '../../../api/Users';
import { useMount } from 'react-use';

const Like = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);  
  const [me,setMe] = useRecoilState(meState);

  const onClickToggle =async () =>{
    const userData = {
      isLikeView:!me?.isLikeView,
    }
    const response = await modifyUser(userData);
    if(response.status === 204){
      onGetMe();
    }else{
      console.log("토글클릭에러 !");
    }
  }
  const onGetMe = async()=>{
    const response = await getMe();
    if(response.status===200){
      setMe(response.data);
    }
  }

  const onGetMovies = async () => {
    const response = await getLikes();
    if (response.status === 200) {
      // console.log(response.data);
      const items = [...response.data];
      //console.log("items",items);
      setMovies(items);
    }
  };

  // console.log(movies);

  const onNavigateDetail = (id) => {
    return () => {
      //MEMO: navigate를 할 때는 /가 있어야 함
      navigate(`/movies/detail/${id}`);
    };
  };

  useEffect(() => {
    onGetMovies();
  }, []);

  useMount(()=>{
    onGetMe();
  })
 
  return (
    <div className={styles.wrapper}>
      <header>
        <h1>좋아요 관리</h1>
        <Toggle checked={me?.isLikeView} onChange={onClickToggle}/>
      </header>
      <section className={styles.cardContainer}>
        <div className={styles.container}>
          {movies.map((item) => (
            <Card
              key={item.id}
              item={item}
              onClick={onNavigateDetail(item.id)}
              className={styles.movie}
              // NOTE: callback은 좋아요 삭제 혹은 생성 시에 실행되는 함수
              callback={onGetMovies}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Like;
