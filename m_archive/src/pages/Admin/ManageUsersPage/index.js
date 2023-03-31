import React from "react";
import { AdminLNB, Button, CheckBox, SearchBox, TableElements, TableMenu } from "../../../components";

import styles from "./manageUsers.module.scss";

const ManageUsersPage = () => {
    return (
        <main className={styles.wrapper}>
            <AdminLNB />
            <section className={styles.allSection}>
                <p className={styles.topMenu}>
                    <span className={styles.menuLeft}>
                        <CheckBox className={styles.check} />
                        전체선택
                    </span>
                    <span className={styles.menuRight}>
                        <Button width={"long"} color={"secondary"}>
                            선택 삭제
                        </Button>
                        <SearchBox className={styles.searchBox} placeholder="제목, 배우, 감독" />
                    </span>
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