import React, { useState, useEffect } from "react";
import styles from './tableElements.module.scss';
import CheckBox from "../CheckBox";
import { getFAQs } from "../../../api/FAQ"

const Users = () => {
  const [FAQs, setFAQs] = useState([]);

  const ongetFAQs = async () => {
    const response = await getFAQs();
    if (response.status === 200) {
      const items = [...response.data.data];
      setUsers(items);
    }
  }

  useEffect(() => {
    getFAQs();
  }, [])

  return (
    <td>
      {FAQs.map((FAQ)=>{
        return (
          <div>
            <span>{FAQ.title}</span>
            <span>{FAQ.user.name}</span>
            <span>{FAQ.content}</span>
            <span>{FAQ.createdAt}</span>
          </div>
        )
      })}
    </td>
  )
}

export default Users