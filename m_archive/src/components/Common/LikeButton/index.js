import React, { memo, useEffect, useState } from "react";
import { LikeRedIcon, LikeBlackIcon, LikeIcon } from "../../../assets/icon";
import styles from "./likebutton.module.scss";
import { createLike,deleteLike,getMovie } from "../../../api/Movies";
import { useMount } from "react-use";
const LikeButton = ({label,movieId}) => {
    const [like, setLike] = useState(false);
    const [movie,setMovie] = useState({});

    const onGetMovie = async (id)=>{
        const response = await getMovie(id);
        if(response.status===200){
            setMovie(response.data);
        }   
    }
    const onCreateLike = async () =>{
        const response = await createLike(movieId);
        if(response.status===201){
          onGetMovie(movieId);
        }
    }
    const onDeleteLike = async ()=>{
        const response = await deleteLike(movieId);
        if(response.status===204){
          onGetMovie(movieId);
        }
    }
    useMount(()=>{
        onGetMovie(movieId);
    });
    useEffect(()=>{
        setLike(movie.isLiked);
    },[movie]);
    const onLikeBtn = () => {
        like===false ? onCreateLike() : onDeleteLike()
    }

    return (
        <label className={styles.wrapper}>
            <span className={styles.click} onClick={onLikeBtn}>
                {like===true ? <LikeRedIcon className={styles.icon2}/> : <LikeIcon className={styles.icon}/>}
                {label && <span className={styles.label}>{label}</span>}
            </span>
        </label>
    )
}

export default memo(LikeButton);