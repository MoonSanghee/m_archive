import React from "react";
import { AdminLNB, Button, CheckBox, SearchBox, TableElements, TableMenu } from "../../../components";

import styles from "./manageUsers.module.scss";

const ManageUsersPage = () => {
    return (
        <main className={styles.wrapper}>
            <AdminLNB />
            <section className={styles.allSection}>
                <p className={styles.topMenu}>
                    <CheckBox className={styles.check} /> 전체선택
                    <Button width={"long"} color={"secondary"}>선택 삭제</Button>
                    <SearchBox placeholder="검색 (제목, 배우, 감독)" />
                </p>
                <p className={styles.secondMenu}>
                    <TableMenu tableName="users" />
                </p>
                <div className={styles.table}>
                    <TableElements />
                </div>
            </section>
        </main>
    )
};

export default ManageUsersPage;