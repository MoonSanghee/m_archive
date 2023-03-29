import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getMovie } from "../../../api/Movies";
import { StarRateButton } from "./_shared";
import styles from "./moviedetail.module.scss";
import { ReviewCard, ShareButton, LikeButton } from "../../../components/Common";

const MovieDetailPage = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState([]);
  const [staffs, setStaffs] = useState([]);
  
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location)
  const onClick = () => {
    return () => {
      const move = location.pathname + '/reviews'
      navigate(move);
    };
  };

  const onGetMovie = async () => {
    const response = await getMovie(params.id);

    // console.log(response)
    if (response.status === 200) {
      setMovie(response.data);
      setGenres(response.data.genres)
      setStaffs(response.data.staffs)
    };

  };

  useEffect(() => {
    if (!params.id) {
      return;
    }
    onGetMovie();
  }, [params.id]);
  console.log(genres)
  return (
    <main>
      <div className={styles.back}>
        <img src={movie?.postImage}/>
      </div>
      <section className={styles.base}>
        <section className={styles.poster}>
          <img src={movie?.postImage}/>
        </section>
        <section className={styles.info}>
          <h2>{movie?.title}</h2>
          <p>
            {movie?.releasedAt}, {movie?.company}
          </p>
          <p>
          장르 :
          {genres.map((genre) =>{
            return (
              <span>{genre.name}</span>
              )
            })}
          </p>
          <p>평균 : {movie?.averageScore}</p>
          <div className={styles.buttons}>
            <StarRateButton/>
            <span className={styles.buttonPlace}>
              리뷰작성
            </span>
            <span className={styles.buttonPlace}>
              <LikeButton/>
              좋아요
            </span>
            <span className={styles.buttonPlace}>
              <ShareButton/>
              공유
            </span>
          </div>
          <p>감독 : 
            {staffs.map((staff) => {
              if (staff.role === '감독')
              return (
                <span>{staff.name}</span>
              )
            })}
          </p>
          <p>배우 : 
            {staffs.map((staff) => {
              if (staff.role === '출연')
              return (
                <span className={styles.actors}>{staff.name}</span>
                )
            })}
          </p>
          <p className={styles.story}>
            <span className={styles.head}>
              줄거리
            </span>
            <p>
            {movie?.plot}
            </p>
          </p>
          <p className={styles.divide}>
            <span className={styles.head}>리뷰</span>
            <span onClick={onClick()}>더보기</span>
          </p>
          <section className={styles.reviews}>
            <ReviewCard/>
            <ReviewCard/>
          </section>
        </section>
      </section>
    </main>
  )
}
export default MovieDetailPage;