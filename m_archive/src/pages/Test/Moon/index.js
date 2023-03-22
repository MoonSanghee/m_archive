import React, { useState } from "react"
import { Input, LNB, SearchBox } from '../../../components';
import styles from "./moon.module.scss"
import { SearchIcon } from '../../../assets/icon';

const Moon = () =>{
    const [isError, setIsError] = useState(false);
    
    const onClickButton = () => {
        setIsError(!isError);
    };

    return(
        <main className={styles.wrapper}>
            <LNB className={styles.left}/>
            <section>
                문상희 테스트페이지
                <button onClick={onClickButton}>버튼입니다.</button>
                <Input label="Id" placeholder="아이디"/>
                <Input label="password" errorText={isError && "비밀번호를 다시 확인해주세요"} />
                <Input label="" className={styles.search} placeholder="무엇을 도와드릴까요"/>
                <div className={styles.boSearchBox}>
                    <Input label="" className={styles.bo} placeholder="검색어를 입력해주세요"/>
                    <SearchIcon className={styles.icon}/>
                </div>
                <div className={styles.searchBox}>
                    <Input label="" className={styles.bo} placeholder="제목, 배우, 감독"/>
                    <SearchIcon className={styles.icon}/>
                </div>
                <SearchBox placeholder="검색검색" />
                <SearchBox placeholder="검색어를 입력해주세요" />
            </section>
        </main>
    )
}

export default Moon;