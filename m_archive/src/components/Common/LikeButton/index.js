import React, { memo, useState } from "react";
import { LikeRedIcon, LikeBlackIcon, LikeIcon } from "../../../assets/icon";
import styles from "./likebutton.module.scss";

const LikeButton = ({label}) => {
    const [like, setLike] = useState(false);

    const onLikeBtn = () => {
        setLike(!like);
    }

    return (
        <label className={styles.wrapper}>
            <span className={styles.click} onClick={onLikeBtn}>
                {like ? <LikeRedIcon className={styles.icon2}/> : <LikeIcon className={styles.icon}/>}
                {label && <span className={styles.label}>{label}</span>}
            </span>
        </label>
    )
}

export default memo(LikeButton);