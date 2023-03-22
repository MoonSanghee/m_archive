import React, { useState } from "react"
import {Toggle, CheckBox, CheckBox2} from "../../../components";
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
                    <h2>조상우 테스트페이지</h2>
                    <Toggle checked={isToggle} onChange={onChangeToggle}></Toggle>
                    <h2>체크박스</h2>
                    <CheckBox check={"check"}/>
                    <h2>체크박스01</h2>
                    <CheckBox/>
                    {/* <h2>체크박스2</h2>
                    <CheckBox2/> */}
            </section>
        </main>
    )
}

export default Jo;