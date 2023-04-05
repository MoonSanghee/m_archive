import React from "react";
import { AdminLNB, CheckBox, SearchBox, Button, TableMenu, TableElements } from "../../../components";
import styles from "./manageReviews.module.scss";
import Reviews from "../../../components/Common/TableElements/Reviews";

const ManageReviewsPage = () => {
    return (
        <main className={styles.wrapper}>
            <AdminLNB/>
            <section className={styles.allSection}>
                <div className={styles.topMenu}>
                    <span className={styles.menuLeft}>
                        <CheckBox className={styles.check} />
                        전체선택
                    </span>
                    <span className={styles.menuRight}>
                        <Button width={"long"} color={"secondary"}>
                            선택 삭제
                        </Button>
                        <SearchBox className={styles.SearchBox} placeholder="제목, 배우, 감독" />
                    </span>
                </div>
                <p className={styles.secondMenu}>
                    <TableMenu tableName="reviews"/>
                </p>
                <p className={styles.table}>
                    <TableElements>
                        <Reviews 
                            limit={10}
                        />
                    </TableElements>
                </p>
            </section>
        </main>
    )
}

export default ManageReviewsPage;