import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "./components/Footer";
import NavBar from "./components/NavbarFree";

const PublicLayout = () => {
  const location = useLocation();
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0 });
  }, [location]);

  return (
    <div className="App" data-testid="app-container">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
