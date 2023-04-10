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

  useEffect(() => {
    if (!users) return;
    setUsers(users);
  }, [users]);
  
  const changeNameOrder = () => {
    setUsers(
      [...users].sort(function (a, b) {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      })
    );
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    const response = await getUsers(currentPage, pageLimit);;
    const count = await countUsers();
    if (response.status === 200) {
      const items = [...response.data.data];
      setTotalPages(Math.ceil(count.data.count / pageLimit));
      setUsers(items);
      setNames(items.map((item)=> {
        return(item.name)
      }))
    };
  };

  useEffect(() => {
    fetchData()
  }, [currentPage, pageLimit]);

  return (
    <div>
      <button onClick={() => changeNameOrder()}>이름</button>
      <table>
        {users.map((user)=>{
          const time = user.createdAt
          return (
            <td className={styles.elements}>
              <CheckBox  className={styles.check} />
              <span>{user.email}</span>
              <span>{user.name} ({user.nickname})</span>
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