import React, { useState, useEffect } from "react";
import styles from './tableElements.module.scss';
import CheckBox from "../CheckBox";
import { getUsers } from "../../../api/Users"

const Users = () => {
  const [users, setUsers] = useState([]);

  const onGetUsers = async () => {
    const response = await getUsers();
    console.log(response)
    if (response.status === 200) {
      const items = [...response.data.data];
      setUsers(items);
    }
  }

  useEffect(() => {
    onGetUsers();
  }, [])

  return (
    <td>
      {users.map((user)=>{
        return (
          <div>
            <span>{user.email}</span>
            <span>{user.name}</span>
            <span>{user.nickname}</span>
            <span>{user.createdAt}</span>
          </div>
        )
      })}
    </td>
  )
}

export default Users