import React from "react";
import { AdminLNB, CheckBox, SearchBox, Button, TableMenu, TableElements } from "../../../components";
import styles from "./manageReviews.module.scss";

const ManageReviewsPage = () => {
    return (
        <main className={styles.wrapper}>
            <AdminLNB/>
            <section className={styles.allSection}>
                <div className={styles.topMenu}>
                    <CheckBox className={styles.check}/> 전체선택
                    <Button width={"long"} color={"secondary"}>선택 삭제</Button>
                    <SearchBox placeholder="검색 (제목, 배우, 감독)" />
                </div>
                <p className={styles.secondMenu}>
                    <TableMenu tableName="reviews"/>
                </p>
                <p className={styles.table}>
                    <TableElements/>
                </p>
            </section>
        </main>
    )
}

export default ManageReviewsPage;