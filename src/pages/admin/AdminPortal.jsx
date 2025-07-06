import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import ProgressIndicator from "../../components/ui/ProgressIndicator";
import UserSidebar from "../../components/layout/UserSidebar";
import UserNav from "../../components/layout/UserNav";
import UserFooter from "../../components/layout/UserFooter";

const AdminPortal = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user.role !== "admin") {
      navigate("/redirect");
    } else {
      setIsLoading(false);
    }
  }, [user, navigate]);

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center dark:bg-gray-800">
        <ProgressIndicator size="lg" />
      </section>
    );
  }

  return (
    <main className="h-screen">
      {/* Dashboard Sidebar */}
      <UserSidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {/* Left Hand Side */}
      <section
        className={`h-screen w-full flex flex-col overflow-y-auto fixed top-0 dark:bg-gray-800 transition-[left,width] duration-300 ${
          isMenuOpen
            ? "left-0"
            : "lg:left-62 lg:w-[calc(100%-248px)] bg-white dark:bg-gray-800"
        }`}
      >
        {/* Dashboard Header */}
        <header className="sticky top-0 shadow-sm border-b z-20 mb-4 dark:border-gray-700 bg-white dark:bg-gray-800">
          <UserNav setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
        </header>
        <div className="flex-1 px-2 sm:px-4 lg:px-6">
          {/* Main content */}
          <section className="my-1 sm:my-4">
            <article className="bg-white dark:bg-gray-800 shadow-around dark:shadow-gray-500 rounded-lg overflow-hidden">
              <div className="py-8 px-4">
                <Outlet context={{ isMenuOpen }} />
              </div>
            </article>
          </section>
        </div>
        <UserFooter />
      </section>
    </main>
  );
};

export default AdminPortal;
