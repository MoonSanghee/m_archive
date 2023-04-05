import React, { useState, useEffect } from "react";
import styles from './tableElements.module.scss';
import CheckBox from "../CheckBox";
import { getUsers, countUsers } from "../../../api/Users"
import Pagination from '../PageNation';
import dayjs from "dayjs";


const Users = ({page, limit}) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(limit);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    const response = await getUsers(currentPage, pageLimit);;
    const count = await countUsers();
    console.log(1)
    if (response.status === 200) {
      const items = [...response.data.data];
      setTotalPages(Math.ceil(count.data.count / pageLimit));
      setUsers(items);
    };
  };

  useEffect(() => {
    fetchData()
  }, [currentPage, pageLimit]);

  return (
    <div>
      <table>
        {users.map((user)=>{
          const time = user.createdAt
          return (
            <td className={styles.elements}>
              <CheckBox  className={styles.check} />
              <span>{user.email}</span>
              <span>{user.name}</span>
              <span>{user.nickname}</span>
              <span>{dayjs(time).format('YYYY-MM-DD HH:mm:ss')}</span>
            </td>
          )
        })}
      </table>
      <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
      />
  </div>
  )
}

export default Users