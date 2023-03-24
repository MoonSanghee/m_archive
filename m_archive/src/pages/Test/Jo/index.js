import React, { useState } from "react"
import {Toggle, CheckBox, LikeButton, ShareButton} from "../../../components";
import styles from "./jo.module.scss";

const Jo = () =>{
    const [isToggle, setIsToggle] = useState(false);

    const onChangeToggle = (e) => {
        const {checked} = e.currentTarget;
        setIsToggle(checked);
    };

    return(
        <main>
            <section className={styles.wrapper}>            
                    <h2>토글</h2>
                    <Toggle checked={isToggle} onChange={onChangeToggle}></Toggle>
                    <h2>체크박스</h2>
                    <CheckBox iconColor={"white"}/>
                    <h2>체크박스01</h2>
                    <CheckBox/>
                    <h2>좋아요</h2>
                    <LikeButton />
                    <h2>공유하기</h2>
                    <ShareButton/>
            </section>
        </main>
    )
}

export default Jo;