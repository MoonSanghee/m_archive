import React from "react"
import { Dropdown } from "../../../components/Common";
import Header from "../../../components/Layout/Header";
import styles from "./seo.module.scss";
import { useCallback } from "react";
import { useState } from "react";
import {  HalfStarIcon, StarIconWhite, StarIconYellow } from "../../../assets/icon";
import {StarRate} from "../../../components/Common/";
import cx from "classnames";
import StarRateButton from "../../Home/MovieDetail/StarRateButton";


const Seo = () =>{
 
   
    const [selectedSort, setSelectedSort] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
   
    const starRates=[
        {
            id:1,
            name:"star-rate",
            rate:3.3,
        },
        {
            id:2,
            name:"star-rate",
            rate:5,
        },
    ]

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

    const starItems = [
        {
            id:1,
            name:"star",
            value:1,
        },
        {
            id:2,
            name:"star",
            value:2,
        },
        {
            id:3,
            name:"star",
            value:3,
        },
        {
            id:4,
            name:"star",
            value:4,
        },
        {
            id:5,
            name:"star",
            value:5,
        }
    ]
    
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
    
                    
                    <div className={styles.starRateWrapper}>
                    {/*starRates.map((item,idx)=>(
                        
                        <StarRate key={"starRate-"+idx} item={item}/>
                    ))*/}
                    <h1>### 저장된 별점 보여주는 컴포넌트 - 리뷰Card etc.</h1>
                    <p>별점 : {starRates[0].rate}</p>
                    <StarRate key={"starRate-"+starRates[0].id} item={starRates[0]}/>
                    <p>별점 : {starRates[1].rate}</p>
                    <StarRate key={"starRate-"+starRates[1].id} item={starRates[1]}/>

                    <h1>### 별점 입력 컴포넌트</h1>
                    <StarRateButton/>
                    <p>이미 별점을 입력했을때 -3.5점</p>
                    <StarRateButton myRate="3.5"/>
                   </div>
                    </section>
              
                </main>
            </div>

    )
}

export default Seo;