import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import {
  LuPencilLine,
  LuBadgePlus,
  LuChartColumn,
  LuShieldAlert,
} from "react-icons/lu";
import { useAuth } from "../../context";
import SecureCard from "../../components/ui/SecureCard";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="">
      {/* Header */}
      <article className="mt-2 mb-6">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-300">
          Admin Dashboard
        </h1>
        <p className="text-md text-gray-500 dark:text-gray-400">
          Welcome, {user?.name}. Manage and oversee student elections.
        </p>
      </article>

      {/* System status card */}
      <article className="my-8">
        <SecureCard>
          <article className="p-6">
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-300">
              System Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <aside className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Active Elections
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-300">
                  2
                </p>
              </aside>
              <aside className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Voters
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-300">
                  1,250
                </p>
              </aside>
              <aside className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  System Version
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-300">
                  v3.2.1
                </p>
              </aside>
            </div>
          </article>
        </SecureCard>
      </article>

      {/* Admin Management */}
      <article className="mt-10 mb-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card
          icon={<LuPencilLine className="text-blue-700 text-3xl" />}
          title="Manage Elections"
          description="View, edit, or update existing elections."
          action={() => navigate("/admin/elections")}
          actionTitle="Go to Manage"
        />
        <Card
          icon={<LuBadgePlus className="text-blue-700 text-3xl" />}
          title="Create New Election"
          description="Set up a new election for students."
          action={() => navigate("/admin/elections/create")}
          actionTitle="Go to Create"
        />
        <Card
          icon={<LuChartColumn className="text-blue-700 text-3xl" />}
          title="View Results"
          description="Monitor real-time and final election results."
          action={() => navigate("/results")}
          actionTitle="Go to View"
        />
        <Card
          icon={<LuShieldAlert className="text-blue-700 text-3xl" />}
          title="Audit Logs"
          description="Track administrative actions and system events."
          action={() => navigate("/admin/audit")}
          actionTitle="Go to Audit"
        />
      </article>
    </section>
  );
};

export default AdminDashboard;
