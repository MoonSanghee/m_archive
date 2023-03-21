import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <div>
      <main>
        {/* <Sidebar /> */}
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;