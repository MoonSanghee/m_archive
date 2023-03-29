import React, { memo, useState } from "react";
import { LikeRedIcon, LikeIcon } from "../../../assets/icon";
import styles from "./likebutton.module.scss";

const LikeButton = () => {
    const [like, setLike] = useState(false);

    const onLikeBtn = () => {
        setLike(!like);
    }

    return (
        <label className={styles.wrapper}>
            <span className={styles.click} onClick={onLikeBtn}>
                {like ? <LikeIcon2 fill="red"/> : <LikeIcon fill="gray"/>}
            </span>
        </label>
    )
}

export default memo(LikeButton);