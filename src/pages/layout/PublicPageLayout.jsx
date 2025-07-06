import { Outlet } from "react-router-dom";
import MainNav from "../../components/layout/MainNav";
import Footer from "../../components/layout/Footer";

const PublicPageLayout = () => {
  return (
    <main className="dark:bg-gray-800">
      <MainNav />
      <Outlet />
      <Footer />
    </main>
  );
};

export default PublicPageLayout;
