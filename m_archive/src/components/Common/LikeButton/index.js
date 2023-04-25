import React, { memo, useState } from "react";
import { LikeIcon2 } from "../../../assets/icon";
import styles from "./likebutton.module.scss";

const LikeButton = () => {
    const [like, setLike] = useState(false);

    const onLikeBtn = () => {
        setLike(!like);
    }

    return (
        <label className={styles.wrapper}>
            <span className={styles.click} onClick={onLikeBtn}>
                {like ? <LikeIcon2 fill="red"/> : <LikeIcon2 fill="gray"/>}
                좋아요 
            </span>
        </label>
    )
}

export default memo(LikeButton);