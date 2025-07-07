import { XIcon } from "@heroicons/react/outline";
import { TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useAuth } from "../../context";
import RoleNav from "./RoleNav";
import logo from "../../assets/logo.png";

const UserSidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <section
      className={`h-screen flex flex-col w-62 fixed top-0 z-20 border-r dark:border-gray-700  dark:bg-gray-800 transition-all duration-300 ${
        isMenuOpen ? "left-0 lg:-left-62" : "-left-62 lg:left-0"
      }`}
    >
      <div
        className={`h-[65px] flex items-center justify-between px-2 sticky top-0 w-full bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700`}
      >
        <Link to="/" className="flex items-center">
          <img src={logo} alt="NOCEN Election portal" className="h-12 w-16" />
          <span className="ml-2 text-sm font-bold text-gray-900 dark:text-gray-200">
            <div>NOCEN ELECTION</div> <div>PORTAL</div>
          </span>
        </Link>
        <button
          onClick={() => setIsMenuOpen(false)}
          className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 cursor-pointer"
        >
          <span className="sr-only">Close main menu</span>
          {isMenuOpen && <XIcon className="block h-6 w-6" aria-hidden="true" />}
        </button>
      </div>
      <article className="h[calc(100vh-64px)] flex-1 custom-scrollbar overflow-y-auto px-2 py-2 bg-white dark:bg-gray-800">
        <RoleNav />
      </article>
      <div className="px-2 sm:px-4 lg:px-6 py-[9.5px] border-t flex justify-end dark:border-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800">
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 border border-transparent text-md font-bold rounded-md  hover:text-gray-400 focus:outline-none"
          onClick={handleLogout}
        >
          Sign out <TbLogout2 />
        </button>
      </div>
    </section>
  );
};

export default UserSidebar;
