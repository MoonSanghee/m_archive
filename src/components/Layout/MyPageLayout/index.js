import { Outlet } from "react-router-dom";
import styles from "./myPageLayout.module.scss";
import ServiceLNB from "../ServiceLNB";

const MyPageLayout = () => {
  return (
    <main className={styles.main}>
      <ServiceLNB />
      <section className={styles.sectionWrapper}>
        <Outlet />
      </section>
    </main>
  );
};

export default MyPageLayout;
