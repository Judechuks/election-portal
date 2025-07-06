import { FaUserCircle } from "react-icons/fa";
import ThemeToggleButton from "../util/ThemeToggleButton";

const UserTab = () => {
  return (
    <nav className="flex gap-2">
      <div className="inline-block border-r-2 border-gray-400 px-2">
        <ThemeToggleButton />
      </div>
      <button
        type="button"
        className="inline-block text-2xl text-gray-700 dark:text-white"
      >
        <FaUserCircle className="w-8 h-8" />
      </button>
    </nav>
  );
};

export default UserTab;
