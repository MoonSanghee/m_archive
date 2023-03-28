import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./layout.module.scss";

const Layout = () => {
  return (
    <main className={styles.main}>
      <Header />
      <section className={styles.sectionWrapper}>
        <Outlet />
      </section>
      <Footer />
    </main>
  );
};

export default Layout;
