import React, { useEffect, useState } from "react";
import { AdminLNB, Button, CheckBox, SearchBox, TableElements, TableMenu } from "../../../components";

import styles from "./manageUsers.module.scss";
import Users from "../../../components/Common/TableElements/Users";
import userStyle from "../../../components/Common/TableElements/tableElements.module.scss";
import { countUsers, deleteUserAdmin, getUsers } from "../../../api/Users";
import dayjs from "dayjs";
import Pagination from "../../../components/Common/PageNation";

const ManageUsersPage = () => {

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const isAllChecked = selectedUsers.length === users.length;

    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (!users) return;
        setUsers(users);
    }, [users]);

    const changeNameOrder = () => {
        setUsers(
            [...users].sort(function (a, b) {
                return a.name < b.name ? -1 : a.name > b.name ? 1: 0;
            })
        )
    }

    const onGetUsers = async () => {
        const response = await getUsers(1, 10);
        if (response.status === 200) {
            const items = [...response.data.data];
            setUsers(items);
        }
    };

    const onCheckUser = (id) => {
        return () => {
            if (selectedUsers.includes(id)) {
                setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
            } else {
                setSelectedUsers([...selectedUsers, id]);
            }
        }
    };

    const onCheckAll = () => {
        if (isAllChecked) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(users.map((user) => user.id));
        }
    }

    const onDeleteUser = () => {
        const userID = selectedUsers;
        for (const el of userID) {
            onDelete(el);
        }
    }

    const onDelete = async(id) => {
        console.log(id);
        const response = await deleteUserAdmin(id);
        if (response.status === 204) {
            alert("정상 삭제");
            onGetUsers();
        } else {
            alert("삭제 오류!");
        }
    }

    useEffect(() => {
        onGetUsers();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const fetchData = async () => {
        const response = await getUsers(currentPage, pageLimit);
        const count = await countUsers();
        if (response.status === 200) {
            const items = [...response.data.data];
            setTotalPages(Math.ceil(count.data.count / pageLimit));
            setUsers(items);
        }
    }

    useEffect(() => {
        fetchData();
    }, [currentPage, pageLimit]);

    return (
        <main className={styles.wrapper}>
            <AdminLNB />
            <section className={styles.allSection}>
                <p className={styles.topMenu}>
                    <span className={styles.menuLeft}>
                        <CheckBox 
                            className={styles.check} 
                            checked={isAllChecked}
                            onChange={onCheckAll}
                        />
                        전체선택
                    </span>
                    <span className={styles.menuRight}>
                        <Button 
                            width={"long"} 
                            color={"secondary"}
                            onClick={onDeleteUser}>
                            선택 삭제
                        </Button>
                        <SearchBox 
                            className={styles.searchBox} 
                            placeholder="제목, 배우, 감독" 
                        />
                    </span>
                </p>
                <p className={styles.secondMenu}>
                    <TableMenu tableName="users" />
                </p>
                <p className={styles.table}>
                    <div>
                        <button onClick={() => changeNameOrder()}>이름</button>
                        <table className={userStyle.users}>
                            {users.map((user, idx) => {
                                const time = user.createdAt
                                return (
                                    <td key={idx} className={userStyle.elements}>
                                        <CheckBox
                                            className={userStyle.check}
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={onCheckUser(user.id)}
                                        />
                                        <span>{user.email}</span>
                                        <span>{user.name} ({user.nickname})</span>
                                        <span>{dayjs(time).format("YYYY-MM-DD HH:mm:ss")}</span>
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
                </p>
            </section>
        </main>
    )
};

export default ManageUsersPage;