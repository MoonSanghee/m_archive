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
<<<<<<< HEAD
        <main className={styles.wrapper}>
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
            <ProfileDropdown/>
        </main>
=======
     
 

            <div className={styles.layout}>
                 <Header/>
                 <main className={styles.main}>
                    <section className={styles.sectionWrapper}>
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
                   
                    </section>
              
                </main>
            </div>
>>>>>>> cdb0a31a6b2027181762afce7a1829324e544484
    )
}

export default Seo;