import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./layout.module.scss";
const Layout = () => {
  return (
      <main className={styles.main}>
        <Header/>
        <section className={styles.sectionWrapper} >
          <Outlet />
          <div className={styles.div}>
            <p>그냥</p>
            <p>내용</p>
            <p>아무</p>
            <p>거나</p>
            <p>집어</p>
            <p>넣음</p>
          </div>
        </section>
        <Footer/>
      </main>
  
  );
};

export default Layout;