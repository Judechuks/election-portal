import { MenuIcon, XIcon } from "@heroicons/react/outline";
import UserTab from "../student/UserTab";

const UserNav = ({ setIsMenuOpen, isMenuOpen }) => {
  return (
    <nav className="px-2 sm:px-4 lg:px-6 pb-[0.5px]">
      <div className="flex items-center justify-between h-16">
        <div className="border rounded">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex items-center justify-center p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-200 hover:dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 cursor-pointer"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <XIcon className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <MenuIcon className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        <div className="">
          <UserTab />
        </div>
      </div>
    </nav>
  );
};

export default UserNav;
