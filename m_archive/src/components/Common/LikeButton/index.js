import React, { memo, useEffect, useState } from "react";
import { LikeRedIcon, LikeBlackIcon, LikeIcon } from "../../../assets/icon";
import styles from "./likebutton.module.scss";
import { createLike,deleteLike,getLikes } from "../../../api/Movies";
import { useMount } from "react-use";
const LikeButton = ({label,movieId}) => {
    const [like, setLike] = useState(false);
    const [myLikes,setMyLikes] = useState([]);
    const onGetLikes = async() =>{
        const response = await getLikes();
        if(response.status===200){
            const items = [...response.data];
            setMyLikes(items);
        }
    }
    const onCreateLike = async () =>{
        const response = await createLike(movieId);
        if(response.status===201){
          setLike(true);
        }
    }
    const onDeleteLike = async ()=>{
        const response = await deleteLike(movieId);
        if(response.status===204){
          setLike(false);
        }
    }
    useEffect(()=>{
        onGetLikes();
        setLike(false);
        myLikes.forEach((item)=>{
            if(item.id === movieId){
                setLike(true);
            }
        })
    },[movieId]);

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