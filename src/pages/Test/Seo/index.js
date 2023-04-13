import React, { useState, useCallback, useEffect } from "react";
import Header from "../../../components/Layout/Header";
import styles from "./seo.module.scss";
import { StarRate, Dropdown, Modal } from "../../../components/Common/";
import cx from "classnames";
import { sortItems, typeItems, starRates } from "./testItems/";
import useModal from "../../../components/Common/Modal/useModal";
import ReviewModal from "../../Home/MovieDetail/ReviewModal";
//import {ReviewButton,StarRateButton}from "../../Home/MovieDetail/_shared/";
import { ReviewWriteIcon } from "../../../assets/icon";
import ReviewCarousel from "../../Home/MovieDetail/ReviewCarousel";
import { getMovieReviews } from "../../../api/Reviews";
const Seo = () => {
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const [modalOption, showModal] = useModal();
  const [isOpen, setIsOpen] = useState(true);
  const [reviews,setReviews] = useState([]);
  const [movieId,setMovieId] = useState('0151449f-d2ae-4753-a44c-79be9044f8ff');

  const starRatesItems = starRates;
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
      isOpen,
      "",
      () => console.log("모달 on"),
      //null,
      setIsOpen(false),
      <ReviewModal
        title="스즈메의 문단속"
        content="리뷰썻음"
        onClose={() => {
          modalOption.onClose();
        }}
      />
    );
  }, []);

  const onGetReviwes = async (id) =>{
    const response = await getMovieReviews(id);

    if (response.status === 200) {
      //console.log(response.data);
      const items = [...response.data];
      //console.log("items",items);
      setReviews(items);
  }
}
useEffect(()=>{
  onGetReviwes(movieId);
},[movieId])

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <section className={styles.sectionWrapper}>

        <ReviewCarousel reviews={reviews}/>
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
         
            {/*starRatesItems.map((itm, idx) => {
              return (
                <StarRate
                  key={`starRate-${idx}`}
                  id={`${itm.name}-${itm.id}`}
                  item={itm}
                />
              );
            })*/}

            {/*
            <h1>### 별점 입력 컴포넌트</h1>
            <StarRateButton />
            <p>이미 별점을 입력했을때 -3.5점</p>
          <StarRateButton myRate="3.5" />*/}
          </div>

          {/*<ReviewButton onClick={onClickOpenModal} btnName="리뷰 수정"/>*/}

          <Modal modalOption={modalOption} modalSize="small" />
          
        </section>
      </main>
    </div>
  );
};

export default Seo;
