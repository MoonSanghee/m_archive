import React,{useEffect,useState} from "react"
import styles from "./userDetail.module.scss";
import { ProfileIcon } from "../../../components";
import { useMount } from "react-use";
import { useParams } from "react-router-dom";
import { getUser } from "../../../api/Users";
import {Tag,Card, ReviewCard,StarRate} from "../../../components/Common";
import { CommentLikeIcon, LockIcon,CommentIcon } from "../../../assets/icon";
import { getUserLikes } from "../../../api/Movies";
import { getUserReviews } from "../../../api/Reviews";


import dayjs from 'dayjs';
const diff = (date) => {
    const now = dayjs();
    return `${now.diff(date, 'day')}일 전`;
  };
const UserDetail = () =>{
    const params = useParams();
    const [user,setUser] = useState({});
    const [likes,setLikes] = useState([]);
    const [reviews,setReviews] = useState([]);
    
    const onGetUser = async ()=>{
        const response = await getUser(params.id);
        if(response.status === 200){
            setUser(response.data);
        }
    }
    const onGetLikes = async ()=>{
        const response = await getUserLikes(params.id);
        if(response.status === 200){
            setLikes(response.data);
        }
    }
    const onGetReviews = async ()=>{
        const response = await getUserReviews(params.id);
        if(response.status === 200){
            setReviews(response.data);
        }
    }
    const onNavigateDetail = (id) => {
        return () => {
          //MEMO: navigate를 할 때는 /가 있어야 함
          navigate(`/movies/detail/${id}`);
        };
      };
    useMount(()=>{
        onGetUser();
        onGetLikes();
        onGetReviews();
    })
    return (
        <main className={styles.wrapper}>
            <section className={styles.sectionWrapper}>
                <h1>{`${user?.nickname} 님의 프로필`}</h1>
                <article className={styles.profileWrapper}>
                    <div className={styles.profileInfo}>
                        <ProfileIcon className={styles.profileIcon} user={user}/>
                        <p className={styles.nickname}>{`${user?.nickname || user?.name} `}</p>
                        <p>{`${user?.description} `}</p>
                    </div>
                    <div className={styles.preferredGenresInfo}>
                        <p>{`${user?.nickname} 님의 취향은?`}</p>
                        {user?.isPreferenceView ? 
                            <div className={styles.preferredGenresWrapper}>
                            {user?.preferredGenres?.map((item)=>{
                                return(
                                    <Tag key={item.id}
                                    border={
                                    'border' + item.id + ' active'
                                    }
                                    >{item.name}</Tag>
                                )
                            })}
                            </div>
                        :
                            <div className={styles.lockWrapper}>
                                <LockIcon/>
                            </div>
                        }
                    </div>
                   

                </article>
            </section>
            <section className={styles.sectionWrapper}>
                <h1>{`${user?.nickname} 님이 좋아하는 영화`}</h1>
                <article className={styles.likesWrapper}>
                    {
                        likes?.map((item)=>(
                            <Card
                              key={item.id}
                              item={item}
                              onClick={onNavigateDetail(item.id)}
                              className={styles.movie}
                              // NOTE: callback은 좋아요 삭제 혹은 생성 시에 실행되는 함수
                              //callback={onGetMovies}
                            />
                          ))
                    }
                </article>
            </section>
            <section className={styles.sectionWrapper}>
            <h1>{`${user?.nickname} 님이 남긴 리뷰`}</h1>
                <article className={styles.reviewsWrapper}>
                    {
                        reviews?.map((item)=>(
                            <div className={styles.reviewInfo} key={item.id}>
                                <img src={item?.movie?.postImage} alt={item?.movie?.title}/>
                                <div className={styles.review}>
                                    <div className={styles.header}>
                                        <ProfileIcon user={item?.user}/>
                                        <div>
                                            <StarRate id={`SR-${item.id}`} item={item}/>
                                            <p>{item?.user?.nickname || item?.user?.name}</p>
                                        </div>
                                    </div>
                                    <div className={styles.content}>
                                        {item?.content}
                                    </div>
                                    <div className={styles.function}>
                                        <span>
                                            <CommentLikeIcon/>
                                            {item?.likeCount}
                                            <CommentIcon/>
                                            {item?.comments?.length}
                                        </span>
                                        <span>{diff(item?.updatedAt)}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </article>  
            </section>
        </main>
    )
}
export default UserDetail;