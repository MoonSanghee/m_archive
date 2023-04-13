import React from 'react';
import styles from './home.module.scss';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMovies, getTop10Movies, getGenreMovies,getMArchiveMovies,getLikes } from '../../api/Movies';
import { useState, useEffect, useCallback } from 'react';
import Carousel from './Carousel';
import { Card, Dropdown, Tag, ScrollTopButton } from '../../components/Common';
import genre from './Genre/genre';
import { sortItems } from './Genre/sortItems';
// import {dropdownSortItems} from
import { useInView } from 'react-intersection-observer';
import { useMe } from '../../hooks';
import { getMyReviews } from '../../api/Reviews';
const Home = () => {
  const me = useMe();
  const navigate = useNavigate();
  const [ref, inView] = useInView();

  const [top10Movies, setTop10Movies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [mArchiveMovies, setMArchiveMovies] = useState([]);
  //const [searchText, setSearchText] = useState("");

  const [genreMovies, setGenreMovies] = useState([]);
  const [pick, setPick] = useState(genre);
  const [select, setSelect] = useState([]); //선택한 tag 배열
  //NOTE: useMemo 사용
  // let genreSelected = '';

  const dropdownSortItems = sortItems;
  const [selectedSort, setSelectedSort] = useState(null);
  const [sort, setSort] = useState('');

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const location = useLocation();
  const alert = location.state;

  const onGetMovies = async () => {
    //서버에서 데이터를 불러옴.
    const response = await getMovies(1, 20);

    if (response.status === 200) {
      //console.log(response.data.data);
      const items = [...response.data.data];
      //console.log("items",items);
      setMovies(items);
    }
  };

  const onGetMArchiveMovies = async()=>{
    //TODO: 영화추천 서비스: 유저 선호하는 장르,(좋아요순으로 검색40개)
    //유저가 이미 좋아요하거나, 리뷰를 매긴(별점,리뷰)영화는 제외
    let result = [];
    let likedMovies = [];
    let reviewedMovies = [];
   
    //1.유저가 좋아요한 영화 가져오기
    let response = await getLikes();
    if(response.status ===200){
      likedMovies = [...response.data];
    }
    //2.유저가 리뷰 쓴 영화 가져오기
    response = await getMyReviews();
    if(response.status === 200){
      reviewedMovies = [...response.data].map(item=>{
        return item.movie
      })
    }
     //3.선호장르로 영화검색 (좋아요영화+리뷰쓴영화 개수 * 2배로 검색)
    response = await getMArchiveMovies(
      (likedMovies.length+reviewedMovies.length)*2,
      me?.preferredGenres.map((item) => item.id).join(','),
    )
    if(response.status === 200){
      const items = [...response.data.data];
      result = [...items];
    }
    result = result.filter(item => {
      return !likedMovies.some(other => other.id === item.id)
    })
    result = result.filter(item => {
      return !reviewedMovies.some(other => other.id === item.id)
    })
    setMArchiveMovies(result);   
  }

  const onGetTop10Movies = async () => {
    const response = await getTop10Movies();
    if (response.status === 200) {
      const items = [...response.data.data];
      setTop10Movies(items);
    }
  };

  const onGetGenreMovies = async () => {
    //NOTE: map 이전
    //[{id : "id1"}, {id : "id2"}]
    //NOTE: map 이후
    //["id1", "id2"]
    //NOTE: join 이후
    //"id1,id2"
    const response = await getGenreMovies(
      page,
      select.map((item) => item.id).join(','),
      sort, //NAME | CREATED_AT | LIKE
    );
    setLoading(true);

    if (response.status === 200) {
      // console.log(response.data.data);
      const items = [...response.data.data];
      let newArr = [...genreMovies, ...items];
      setGenreMovies(newArr);
    }
    setLoading(false);
  };

  const onNavigateDetail = (id) => {
    return () => {
      navigate(`/movies/detail/${id}`);
    };
  };

  const onClickBtn = (item) => {
    return () => {
      !select.includes(item)
        ? setSelect((select) => [...select, item])
        : setSelect(select.filter((button) => button !== item));

      setGenreMovies([]);
      setPage(1);
    };
  };

  //드랍다운
  const onClickSortDropdown = useCallback((item) => {
    return () => {
      setSelectedSort((prev) => (prev?.id === item.id ? null : item));
      setSort(item.value);

      setGenreMovies([]);
      setPage(1);
      getGenreMovies();
    };
  }, []);

  useEffect(() => {
    onGetMovies();
    onGetTop10Movies();
  }, []);

  useEffect(() => {
    onGetGenreMovies();
  }, [select]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
      onGetGenreMovies();
    }
  }, [inView, loading]);

 useEffect(()=>{
    onGetMArchiveMovies(); 
  },[me]);
  return (
    <main className={styles.wrapper}>
      <ScrollTopButton />
      <section className={styles.top10Wrapper}>
        <h1 className={styles.header}>Top 10</h1>
        <Carousel movies={top10Movies} type="top10" />
      </section>
      <section className={styles.rcmdWrapper}>
        <h1 className={styles.header}>M-archive 영화 추천</h1>
        <Carousel movies={mArchiveMovies || movies} type="recommend" />
      </section>
      <section className={styles.genreWrapper}>
        <h1 className={styles.header}>장르</h1>
        <nav className={styles.nav}>
          {/* genre tag */}
          <div className={styles.tag}>
            {pick.map((item) => {
              return (
                <Tag
                  key={item.id}
                  // width={"middle"}
                  border={'border' + (select.includes(item) ? ' active' : '')}
                  onClick={onClickBtn(item)}
                >
                  {item.name}
                </Tag>
              );
            })}
          </div>
          <Dropdown
            items={dropdownSortItems}
            valueKey="name"
            value={selectedSort?.name}
            onClick={onClickSortDropdown}
          />
        </nav>

        <div className={styles.genreMovies}>
          {genreMovies.length > 0 &&
            genreMovies.map((item) => {
              return (
                <Card
                  key={item.id}
                  item={item}
                  onClick={onNavigateDetail(item.id)}
                />
              );
            })}
        </div>
        <div ref={ref}></div>
        {/* ref - 마지막 아이템에 사용해야 하지만 컴포넌트에는 ref를 사용할 수 없음 */}
      </section>
      {alert && ( //회원가입 장르 선택 안하면 알림띄우기
        <div className={styles.alert}>
          <p>취향은 마이페이지에서 수정이 가능합니다.</p>
        </div>
      )}
    </main>
  );
};
export default Home;
