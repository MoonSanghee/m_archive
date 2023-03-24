import React, {useState,useCallback} from "react"
import Header from "../../../components/Layout/Header";
import styles from "./seo.module.scss";
import {StarRate, Dropdown,Modal} from "../../../components/Common/";
import cx from "classnames";
import StarRateButton from "../../Home/MovieDetail/StarRateButton";
import  {sortItems, typeItems,starRates} from "./testItems/";
import useModal from "../../../components/Common/Modal/useModal";
import ReviewModal from "../../Home/MovieDetail/ReviewModal";
import DetailButton from "../../../pages/Home/MovieDetail/_shared/DetailButton";
import { ReviewWriteIcon } from "../../../assets/icon";

const Seo = () =>{
    const [selectedSort, setSelectedSort] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
  
    const [modalOption,showModal] = useModal();
  

    const starRatesItems=starRates ;
    const dropdownSortItems = sortItems;
    const dropdownBOItems = typeItems;

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


    const onClickOpenModal = useCallback(() => {
        showModal(
          true, 
          "", 
          () => console.log("모달 on"),
          null,
          <ReviewModal title="스즈메의 문단속" content="리뷰썻음" onClose={()=>{modalOption.onClose();} } />
        );
      }, [modalOption]);



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

                      <h1>### 저장된 별점 보여주는 컴포넌트 - 리뷰Card etc.</h1>
                      {starRatesItems.map((itm,idx)=>{
                          return(
                          <StarRate key={`starRate-${idx}`} id={`${itm.name}-${itm.id}`} item={itm} />
                          )
                          })}
                      
                      <h1>### 별점 입력 컴포넌트</h1>
                      <StarRateButton/>
                      <p>이미 별점을 입력했을때 -3.5점</p>
                      <StarRateButton myRate="3.5"/>
                   </div>
                      

                  <DetailButton onClick={onClickOpenModal}>
                    <ReviewWriteIcon/>
                  리뷰 수정
                  </DetailButton>
                  <Modal modalOption={modalOption} modalSize="small" />    
        
                    </section>
              
                </main>
            </div>

    )
}

export default Seo;