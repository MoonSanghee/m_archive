import React, { useEffect, useState } from 'react';
import { Card, ScrollTopButton, Toggle } from '../../../components';
import styles from './like.module.scss';
import { createLike, getLikes } from '../../../api/Movies';
import {useRecoilState, } from "recoil";
import { meState} from '../../../recoil';
import { useNavigate } from 'react-router-dom';
import { getMe,modifyUser } from '../../../api/Users';
import { useMount } from 'react-use';
import { LikeIcon } from '../../../assets/icon';
import { scrollTop } from '../../../utils';
import cx from "classnames";

const Like = () => {
  const navigate = useNavigate();
  const [toggleHovered,setToggleHovered] = useState(false);
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
      const items = [...response.data];
      setMovies(items);
    }
  };

  const onNavigateDetail = (id) => {
    return () => {
      //MEMO: navigate를 할 때는 /가 있어야 함
      navigate(`/movies/detail/${id}`);
    };
  };


  useMount(()=>{
    scrollTop();
    onGetMe();
    onGetMovies();

  })
 
  return (
    <div className={styles.wrapper}>
      <header>
        <h1>좋아요 관리</h1>
        <Toggle checked={me?.isLikeView} onChange={onClickToggle}
            onMouseOver={() => setToggleHovered(true)}
            onMouseOut={() => setToggleHovered(false)}
        />
        <div className={cx(styles.toggleText,{[styles.show]:toggleHovered})}>
             <p>{`❤️ On/Off : 
              다른 유저에게 나의 좋아요 보이기 😃 / 숨기기 😌`}</p>      
          </div>
      </header>
      <section className={styles.cardContainer}>
      {movies?.length === 0 &&  
          <p className={styles.offering}>
            <LikeIcon/>
            No likes created
          </p>} 
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
