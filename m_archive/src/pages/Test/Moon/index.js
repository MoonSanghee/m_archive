import React, { useState } from "react"
import { Input } from '../../../components';
import styles from "./moon.module.scss"


const Moon = () =>{
    const [isError, setIsError] = useState(false);
    
    const onClickButton = () => {
        setIsError(!isError);
    };

    return(
        <main>
            문상희 테스트페이지
            <button onClick={onClickButton}>버튼입니다.</button>
            <Input label="Id" placeholder="아이디"/>
            <Input label="password" errorText={isError && "비밀번호를 다시 확인해주세요"} />
            <Input label="" className={styles.search} placeholder="무엇을 도와드릴까요"/>
            <Input label="" className={styles.bo} placeholder="검색어를 입력해주세요"/>
        </main>
    )
}

export default Moon;