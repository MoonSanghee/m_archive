import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { createLike, deleteLike, getMovie } from '../../../api/Movies';
import { ReviewButton, StarRateButton,ReviewCarousel,ReviewModal } from './_shared';
import styles from './moviedetail.module.scss';
import {
  ShareButton,
  LikeButton,
  Modal,
} from '../../../components/Common';
import { getMovieReviews, getMovieMyReview } from '../../../api/Reviews';
import useModal from '../../../components/Common/Modal/useModal';
import { useMount } from 'react-use';
import dayjs from 'dayjs';
import {useRecoilValue} from "recoil";
import {meState} from "../../../recoil";
import { scrollTop } from '../../../utils';

const MovieDetailPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const me = useRecoilValue(meState);
  //해당 영화-정보
  const [movie, setMovie] = useState({});
  //해당 영화-리뷰들
  const [reviews, setReviews] = useState([]);
  //해당 영화-나의 리뷰
  const [myReview, setMyReview] = useState({});
  //모달
  const [modalOption, showModal,onClose] = useModal();

  // NOTE: curring이 필요없는 함수
  const onClick = () => {
    if(!me){
      alert("로그인이 필요한 서비스입니다.");
      return;
    }
    const move = location.pathname + '/reviews';
    navigate(move);
  };
  const onClickStar = () => {
    onGetReviews(params.id);
    onGetMovie(params.id);
    // setStarCliked(!starClicked);
  };

  const onGetMovie = async (id) => {
    const response = await getMovie(id);
    if (response.status === 200) {
      setMovie(response.data);
    }
  };

  const onCreateLike = async () => {
    const response = await createLike(movie.id);
    if (response.status === 201) {
      onGetMovie(movie.id);
    }
  };

  const onDeleteLike = async () => {
    const response = await deleteLike(movie.id);
    if (response.status === 204) {
      onGetMovie(movie.id);
    }
  };

  const onLikeBtn = () => {
    if(!me){
      alert("로그인이 필요한 서비스입니다.");
      return;
    }
    if (!movie) {
      return;
    }
    movie.isLiked === false ? onCreateLike() : onDeleteLike();
  };

  const onGetReviews = async (id) => {
    const response = await getMovieReviews(id);
    if (response.status === 200) {
      const sorted = response.data.sort(function(a, b) {
        return a.likeCount - b.likeCount
      }).reverse()
      setReviews(sorted);
    }
  };
  const onGetMyReview = async (id) => {
    //해당 영화의 리뷰 목록중 내가 쓴 목록이 있으면 reviewID 리턴
    //리뷰쓴 userId와 내 userId 비교 -> 내 리뷰가 있으면 내리뷰리턴
    if (me === null) {
      //console.log("로그아웃상태, 로그인바람");
      return;
    }

    const response = await getMovieMyReview(id);
    if (response.status === 200) {
      if (response.data) setMyReview(response.data);
      else{
        setMyReview({});
      }
    }
  };

  const onClickOpenModal = useCallback(() => {
    if(!me){
      alert("로그인이 필요한 서비스입니다.");
      return;
    }
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
          onClose(()=>{
            if (!params.id) {
              return;
            }
            onGetMovie(params.id);
            onGetReviews(params.id);
            onGetMyReview(params.id);
          })
         
        }}
      />,
    );
  }, [movie, myReview, modalOption]);

  const isEmptyObject = (param) => {
    return Object.keys(param).length === 0 && param.constructor === Object;
  };

  useMount(() => {
    scrollTop();
    if (!params.id) {
      console.log(params.id, '없음');
      return;
    }
    onGetMovie(params.id);
    onGetReviews(params.id);
    onGetMyReview(params.id);
    //if (reviews.length > 0) findMyReview(reviews);
  });

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
              {dayjs(movie?.releasedAt).format("YYYY.MM.DD")}, {movie?.company}
            </p>
            <p>
              장르 :
              {movie?.genres?.map((genre) => {
                return <span key={`장르-${genre.id}`}>{genre.name}</span>;
              })}
            </p>
            {/* //NOTE: toFixed(1) => 소수점 1자리까지 출력 */}
            <p>평균 : {movie?.averageScore?.toFixed(1)}</p>
          </div>

          <div className={styles.buttons}>
            <span className={styles.starButton}>
              <StarRateButton
                myReview={!isEmptyObject(myReview) ? myReview : null}
                movieId={movie?.id}
                isModified={!isEmptyObject(myReview)}
                reload={onClickStar}
                me={me}
                
              />
            </span>
            
            <span className={styles.buttonPlace}>
              <ReviewButton
                onClick={onClickOpenModal}
                label={isEmptyObject(myReview) ? '리뷰 작성' : '리뷰 수정'}
              />
            </span>
            <span className={styles.buttonPlace}>
              <LikeButton
                label="좋아요"
                //movieId={movie?.id}
                onClick={onLikeBtn}
                isLiked={movie?.isLiked}
              />
            </span>
            <span className={styles.buttonPlace}>
              <ShareButton label="공유" />
            </span>
          </div>
          <div className={styles.movieDetails}>
            <p>
              감독 :
              {/* //NOTE: if문으로 map을 하려면 if문에도 return이, else문에도 return이 있어야 합니다. (안그러면 undefined return)  */}
              {movie?.staffs
                ?.filter((staff) => staff.role === '감독')
                .map((staff) => {
                  return <span key={`감독-${staff.id}`}>{staff.name}</span>;
                })}
            </p>
            <p>
              배우 :
              {/* //NOTE: if문으로 map을 하려면 if문에도 return이, else문에도 return이 있어야 합니다. (안그러면 undefined return)  */}
              {movie?.staffs
                ?.filter((staff) => staff.role === '출연')
                .map((staff) => {
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
            <span className={styles.more} onClick={onClick}>
              더보기
            </span>
          </div>
          <section className={styles.reviews}>
            <ReviewCarousel reviews={reviews} />
          </section>
          
        </section>
      </section>
      <Modal modalOption={modalOption} modalSize="small" />
    </main>
  );
};
export default MovieDetailPage;
