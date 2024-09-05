import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import Navbar from "./layouts/header/Navbar";
import "react-multi-carousel/lib/styles.css";
import Footer from "./layouts/footer";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <Navbar />

      <main className="mt-[58px] md:mt-[155px] lg:mt-[122px] xl:mt-[122px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
