import React,{useEffect,useState} from "react"
import styles from "./userDetail.module.scss";
import { ProfileIcon } from "../../../components";
import { useMount } from "react-use";
import { useParams } from "react-router-dom";
import { getUser } from "../../../api/Users";
import {Tag} from "../../../components/Common";
import { LockIcon } from "../../../assets/icon";
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
    useMount(()=>{
        onGetUser();
    })
    return (
        <main className={styles.wrapper}>
            <section className={styles.sectionWrapper}>
                <h1>{`${user?.nickname} 님의 프로필`}</h1>
                <article className={styles.profileWrapper}>
                    <div className={styles.profileInfo}>
                        <ProfileIcon className={styles.profileIcon} user={user}/>
                        <p className={styles.nickname}>{`${user?.nickname} `}</p>
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
                <article>

                </article>
            </section>
            <section className={styles.sectionWrapper}>
            <h1>{`${user?.nickname} 님이 남긴 리뷰`}</h1>
                <article>

                </article>  
            </section>
        </main>
    )
}
export default UserDetail;