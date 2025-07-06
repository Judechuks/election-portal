import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  CollectionIcon,
  UsersIcon,
  ChartPieIcon,
  ClipboardListIcon,
  CogIcon,
} from "@heroicons/react/outline";
import { LuBadgePercent } from "react-icons/lu";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { FaChartLine } from "react-icons/fa6";

import { useAuth } from "../../context";

const RoleNav = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  // const isActive = (path) => location.pathname.startsWith(path);
  const isActive = (path) => location.pathname == path;

  const adminLinks = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: HiOutlineSquaresPlus,
      current: isActive("/admin"),
    },
    {
      name: "Elections",
      href: "/admin/elections",
      icon: CollectionIcon,
      current: isActive("/admin/elections"),
    },
    {
      name: "Voters",
      href: "/admin/voters",
      icon: UsersIcon,
      current: isActive("/admin/voters"),
    },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: FaChartLine,
      current: isActive("/admin/reports"),
    },
    {
      name: "Audit Logs",
      href: "/admin/audit",
      icon: ClipboardListIcon,
      current: isActive("/admin/audit"),
    },
    {
      name: "Home",
      href: "/",
      icon: HomeIcon,
      current: isActive("/"),
    },
    {
      name: "Results",
      href: "/results",
      icon: LuBadgePercent,
      current: isActive("/results"),
    },
    {
      name: "Live Results",
      href: "/live-results",
      icon: ChartPieIcon,
      current: isActive("/live-results"),
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: CogIcon,
      current: isActive("/admin/settings"),
    },
  ];

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

  const links = user.role === "admin" ? adminLinks : studentLinks;

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
