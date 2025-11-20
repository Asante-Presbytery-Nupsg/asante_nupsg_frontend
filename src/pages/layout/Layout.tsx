import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";



const Layout = () => {
  return (
    <div>
          {/* navbar */}
          <div className="">
              <Navbar/>
          </div>

          {/* main */}
          <div className="">
              <Outlet/>
          </div>
          {/* footer */}
          <div className="">
            <Footer/>
          </div>
    </div>
  );
}

export default Layout