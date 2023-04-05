import React, { useState, useEffect } from "react";
import styles from './tableElements.module.scss';
import CheckBox from "../CheckBox";
import { getFAQs } from "../../../api/FAQ"
import Pagination from "../PageNation";

const FAQs = ({ page, limit }) => {
  const [FAQs, setFAQs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(limit);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onGetFAQs = async () => {
    const response = await getFAQs();
    console.log(1)
    console.log(response)
    if (response.status === 200) {
      const items = [...response.data.data];
      setFAQs(items);
    }
  }

  useEffect(() => {
    onGetFAQs();
  }, [currentPage, limit])

  return (
    <div>
      <table>
        {FAQs.map((FAQ)=>{
          return (
            <td className={styles.elements}>
              <CheckBox/>
              <span>{FAQ.title}</span>
              <span>{FAQ.user.name}</span>
              <span>{FAQ.content}</span>
              <span>{FAQ.createdAt}</span>
            </td>
          )
        })}
      </table>
      <Pagination
          currentPage={currentPage}
          totalPages={3}
          onPageChange={handlePageChange}
      />
    </div>
  )
}

export default FAQs