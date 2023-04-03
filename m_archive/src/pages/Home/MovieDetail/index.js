import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getMovie } from '../../../api/Movies';
import { ReviewButton, StarRateButton } from './_shared';
import styles from './moviedetail.module.scss';
import {
  ReviewCard,
  ShareButton,
  LikeButton,
  Modal,
} from '../../../components/Common';
import ReviewCarousel from './ReviewCarousel';
import { getMovieReviews } from '../../../api/Reviews';
import useModal from '../../../components/Common/Modal/useModal';
import ReviewModal from './ReviewModal';
import { useMe } from '../../../hooks';
import { useMount } from 'react-use';


const MovieDetailPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const me = useMe(); 
  //해당 영화-정보
  const [movie, setMovie] = useState({});
  const [details, setDetails] = useState({
    genres: [],
    staffs: [],
  });
  //해당 영화-리뷰들
  const [reviews, setReviews] = useState([]);
  //해당 영화-나의 리뷰
  const [myReview, setMyReview] = useState({});
  //모달
  const [modalOption, showModal] = useModal();
  //const [isOpen, setIsOpen] = useState(true);

  //별점
  const [starClicked, setStarCliked] = useState(false);
  const onClick = () => {
    return () => {
      const move = location.pathname + 'reviews';
      navigate(move);
    };
  };
  const onClickStar=()=>{
    return ()=>{
      setStarCliked(!starClicked);
    }
  }

  const onGetMovie = async (id) => {
    const response = await getMovie(id);
    if (response.status === 200) {
      setMovie(response.data);
      setDetails({
        genres: response.data.genres,
        staffs: response.data.staffs,
      });
    }
  };
  
  const onGetReviews = async (id) => {
    const response = await getMovieReviews(id);
    if (response.status === 200) {
      //const items = [...response.data]; 
      //setReviews(items);
      setReviews(response.data);
    }
  };

  const onClickOpenModal = useCallback(() => {
    showModal(
      true,
      '',
      null,
      null,
      <ReviewModal
        title={movie?.title}
        isEmptyReview={isEmptyObject(myReview)}
        movieId={movie?.id}
        myReview={myReview}
        onClose={() => {
          //NOTE: 생성/수정/삭제와 같이 데이터를 변경하는 API를 사용한다면 -> API 요청 완료 후에 재요청을 해야한다~
          modalOption.onClose();
          if (!params.id) {
            return;
          }
          onGetMovie(params.id);
          onGetReviews(params.id);
        }}
      />,
    );
  }, [movie, myReview, modalOption]);

  const findMyReview = (items) => {
    //해당 영화의 리뷰 목록중 내가 쓴 목록이 있으면 reviewID 리턴
    //리뷰쓴 userId와 내 userId 비교 -> 내 리뷰가 있으면 내리뷰리턴
    if(!me){
      //console.log("로그아웃상태, 로그인바람");
      return;
    }
    const review = items.filter((item) => {
      if (item.user.id === me.id) {
        return item;
      }
    });
    if (review.length > 0) {
      setMyReview(review[0]);
      //console.log(myReview);
    } else {
      setMyReview({});
    }
  };
  const isEmptyObject =(param) =>{
    return Object.keys(param).length === 0 && param.constructor === Object;
  }
  useEffect(() => {
    console.log("별점 변동됨");
    onGetReviews(params.id);
    //if (reviews.length > 0) findMyReview(reviews);
  }, [starClicked]);

  useEffect(()=>{
    findMyReview(reviews);
  },[reviews])
  useMount(()=>{
    if (!params.id) {
      console.log(params.id, '없음');
      return;
    }
    onGetMovie(params.id);
    onGetReviews(params.id); 
    //if (reviews.length > 0) findMyReview(reviews);
  })

  return (
    <main>
      <div className={styles.back}>
        <img src={movie?.postImage} />
      </div>
      <section className={styles.base}>
        <section className={styles.poster}>
          <img src={movie?.postImage} />
        </section>
        <section className={styles.info}>
          <h2>{movie?.title}</h2>
          <div className={styles.movieDetails}>
            <p>
              {movie?.releasedAt}, {movie?.company}
            </p>
            <p>
              장르 :
              {details.genres.map((genre) => {
                return <span key={`장르-${genre.id}`}>{genre.name}</span>;
              })}
            </p>
            <p>평균 : {movie?.averageScore}</p>
          </div>

          <div className={styles.buttons}>
            <StarRateButton
              myReview={!isEmptyObject(myReview) ? myReview:null} 
              movieId={movie?.id}
              isModified={!isEmptyObject(myReview)}
              reload={onClickStar()}
              //onClick={onClickStar}
              //clickedStarIndex={clickedStarIndex}
            />
            <span className={styles.buttonPlace}>
              <ReviewButton
                onClick={onClickOpenModal}
                label={isEmptyObject(myReview) ? '리뷰 작성' : '리뷰 수정'}
              />
            </span>
            <span className={styles.buttonPlace}>
              <LikeButton label="좋아요" movieId={movie?.id} />
            </span>
            <span className={styles.buttonPlace}>
              <ShareButton label="공유" />
            </span>
          </div>
          <div className={styles.movieDetails}>
            <p>
              감독 :
              {details.staffs.map((staff) => {
                if (staff.role === '감독')
                  return <span key={`감독-${staff.id}`}>{staff.name}</span>;
              })}
            </p>
            <p>
              배우 :
              {details.staffs.map((staff) => {
                if (staff.role === '출연')
                  return (
                    <span key={`출연-${staff.id}`} className={styles.actors}>
                      {staff.name}
                    </span>
                  );
              })}
            </p>
          </div>
          <div className={styles.story}>
            <p className={styles.head}>줄거리</p>
            <p className={styles.plot}>{movie?.plot}</p>
          </div>
          <div className={styles.divide}>
            <p className={styles.head}>리뷰</p>
            <span className={styles.more} onClick={onClick()}>
              더보기
            </span>
          </div>
          <section className={styles.reviews}>
            <ReviewCarousel reviews={reviews} />
          </section>
          <Modal modalOption={modalOption} modalSize="small" />
        </section>
      </section>
    </main>
  );
};
export default MovieDetailPage;
