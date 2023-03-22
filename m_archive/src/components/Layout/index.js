import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    
      <main>

        <section >
          <Outlet />
        </section>
        <Footer/>
      </main>
  
  );
};

export default Layout;