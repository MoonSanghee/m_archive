import { Outlet } from "react-router-dom";
import styles from "./myPageLayout.module.scss";
import LNB2 from "../LNB2";

const MyPageLayout = () => {
  return (
    <main className={styles.main}>
        <LNB2/>
        <section className={styles.sectionWrapper}>
            <Outlet />      
        </section>
    </main>
  );
};

export default MyPageLayout;
