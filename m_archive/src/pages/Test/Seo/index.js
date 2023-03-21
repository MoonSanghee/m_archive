import React from "react"
import { Dropdown } from "../../../components/Common";
import Header from "../../../components/Layout/Header";
import styles from "./seo.module.scss";
import { useCallback } from "react";
import { useState } from "react";


const Seo = () =>{
    const [selectedSort, setSelectedSort] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const dropdownSortItems = [
        {
            id:1,
            name:"최신순",
            value:"sort-date",
        },
        {
            id:2,
            name:"가나다순",
            value:"sort-name",
        },
        {
            id:3,
            name:"좋아요순",
            value:"sort-like",
        },
    ]
    const dropdownBOItems = [
        {
            id:1,
            name:"건의하기",
            value:"proposal",
        },
        {
            id:2,
            name:"신고하기",
            value:"report",
        },
        {
            id:3,
            name:"질문하기",
            value:"question",
        },
    ];
    const onClickSortDropdown = useCallback((item) => {
        return () => {
          setSelectedSort((prev) => (prev?.id === item.id ? null : item));
        };
      }, []);
    const onClickTypeDropdown = useCallback((item) => {
        return () => {
          setSelectedType((prev) => (prev?.id === item.id ? null : item));
        };
      }, []);
    return(
        <main className={styles.wrapper}>
            <Header/>
            {//<h1>서진주 테스트페이지</h1>
            }
            <Dropdown 
            items={dropdownSortItems} 
            valueKey="name" 
            value={selectedSort?.name}
            onClick={onClickSortDropdown}
            />
            <Dropdown 
            items={dropdownBOItems} 
            valueKey="name" 
            value={selectedType?.name}
            onClick={onClickTypeDropdown}
            color="secondary"
            />
        </main>
    )
}

export default Seo;