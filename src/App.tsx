import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./layouts/header/Navbar";
import "react-multi-carousel/lib/styles.css";
import Footer from "./layouts/footer";
import { useAppSelector } from "./app/hooks";
import { selectCartValues } from "./features/cart/slice";
import BackToTopButton from "./components/ui/BackToTopButton";

function App() {
  const { pathname } = useLocation();
  const cartValues = useAppSelector(selectCartValues);

  useEffect(() => {
    localStorage.setItem("cartValues", JSON.stringify(cartValues));
  }, [cartValues]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <Navbar />

      <main className="mt-[58px] md:mt-[155px] lg:mt-[122px] xl:mt-[122px]">
        <Outlet />
        <BackToTopButton />
      </main>

      <Footer />
    </div>
  );
}

export default App;
