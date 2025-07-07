import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  CollectionIcon,
  ChartPieIcon,
} from "@heroicons/react/outline";
import { FaChartLine } from "react-icons/fa6";

import { useAuth } from "../../context";

const RoleNav = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  // const isActive = (path) => location.pathname.startsWith(path);
  // const isActive = (path) => location.pathname == path;
  const isActive = (path) => {
    const currentPath = location.pathname;

    if (path === "/") {
      return currentPath === "/";
    }

    return currentPath.startsWith(path);
  };

  const studentLinks = [
    {
      name: "Home",
      href: "/",
      icon: HomeIcon,
      current: isActive("/"),
    },
    {
      name: "My Elections",
      href: "/student",
      icon: CollectionIcon,
      current: isActive("/student"),
    },
    {
      name: "Results",
      href: "/results",
      icon: FaChartLine,
      current: isActive("/results"),
    },
    {
      name: "Live Results",
      href: "/live-results",
      icon: ChartPieIcon,
      current: isActive("/live-results"),
    },
  ];

  const links = user.role === "student" && studentLinks;

  return (
    <nav className="space-y-1 px-1 py-4 rounded-lg bg-white dark:bg-gray-800">
      {links.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={`group flex items-center px-4 py-2 text-sm font-medium border-l-2 hover:text-blue-700 dark:hover:text-blue-700 hover:border-blue-700 hover:bg-gray-50 ${
            item.current
              ? "border-blue-600 text-blue-600"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          <item.icon
            className={`flex-shrink-0 -ml-1 mr-2 h-5 w-5 ${
              item.current
                ? "text-blue-600"
                : "text-gray-600 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-700"
            }`}
          />
          <span className="truncate">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default RoleNav;
