import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import UserNav from "../../components/layout/UserNav";
import UserSidebar from "../../components/layout/UserSidebar";
import ProgressIndicator from "../../components/ui/ProgressIndicator";
import UserFooter from "../../components/layout/UserFooter";
import VotingInfoCard from "../../components/ui/VotingInfoCard";

const StudentPortal = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user.role !== "student") {
      navigate("/redirect");
    } else {
      setIsLoading(false);
    }
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-800">
        <ProgressIndicator size="lg" />
      </div>
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
          <section className="">
            <article className="bg-white dark:bg-gray-800 shadow-around dark:shadow-gray-500 rounded-lg overflow-hidden">
              <div className="p-4">
                <Outlet context={{ isMenuOpen }} />
              </div>
            </article>

            {/* Voting information card */}
            <VotingInfoCard />
          </section>
        </div>
        <UserFooter />
      </section>
    </main>
  );
};

export default StudentPortal;
