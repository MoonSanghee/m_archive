import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <div className={styles.app}>
      <main>
        <Sidebar />
        <section className={styles.features}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;