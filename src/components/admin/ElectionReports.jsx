import { useState } from "react";
import { Link } from "react-router-dom";
import {
  DocumentTextIcon,
  ChartBarIcon,
  TableIcon,
} from "@heroicons/react/outline";
import SecureCard from "../ui/SecureCard";

const ElectionReports = () => {
  const [timeRange, setTimeRange] = useState("all");
  const [reportType, setReportType] = useState("summary");

  // Mock data for past elections
  const pastElections = [
    {
      id: "1",
      title: "Student Union President 2023",
      date: "2023-10-01 to 2023-10-07",
      positions: 3,
      voters: 1250,
      turnout: "78%",
    },
    {
      id: "2",
      title: "Faculty Representatives 2022",
      date: "2022-11-01 to 2022-11-07",
      positions: 5,
      voters: 1200,
      turnout: "72%",
    },
    {
      id: "3",
      title: "Student Union President 2021",
      date: "2021-10-01 to 2021-10-07",
      positions: 3,
      voters: 1150,
      turnout: "75%",
    },
  ];

  return (
    <div className="space-y-6">
      <article className="flex justify-between items-start flex-wrap gap-x-2 gap-y-3">
        <aside>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-300">
            Election Reports
          </h1>
          <p className="text-md text-gray-500">
            View and manage election reports.
          </p>
        </aside>
        <div className="ml-auto flex space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-md shadow-sm py-2 px-3 dark:bg-gray-800 dark:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
          >
            <option value="all">All Time</option>
            <option value="year">This Year</option>
            <option value="semester">This Semester</option>
            <option value="month">This Month</option>
          </select>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="border border-gray-300 rounded-md shadow-sm py-2 px-3 dark:bg-gray-800 dark:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
          >
            <option value="summary">Summary Reports</option>
            <option value="detailed">Detailed Reports</option>
            <option value="analytics">Voter Analytics</option>
          </select>
        </div>
      </article>

      <SecureCard>
        <div className="p-3 sm:p-6 my-6 sm:my-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 dark:bg-gray-900 shadow-around p-4 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 dark:text-blue-50 mb-2">
                Quick Reports
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/admin/reports/turnout"
                    className="flex items-start text-blue-600 dark:text-blue-200 hover:text-blue-800 dark:hover:text-blue-400"
                  >
                    <ChartBarIcon className="h-5 w-5 mr-2" />
                    Voter Turnout Analysis
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/reports/participation"
                    className="flex items-center text-blue-600 dark:text-blue-200 hover:text-blue-800 dark:hover:text-blue-400"
                  >
                    <DocumentTextIcon className="h-5 w-5 mr-2" />
                    Participation Trends
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/reports/audit"
                    className="flex items-center text-blue-600 dark:text-blue-200 hover:text-blue-800 dark:hover:text-blue-400"
                  >
                    <TableIcon className="h-5 w-5 mr-2" />
                    Audit Summary
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-300">
                Past Elections
              </h3>
              <div className="w-full overflow-auto hiddn border border-gray-200 rounded-lg custom-scrollbar">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Election
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Positions
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Voters
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Turnout
                      </th>
                      <th
                        scope="col"
                        className="relative px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wide"
                      >
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-transparent divide-y divide-gray-200">
                    {pastElections.map((election) => (
                      <tr key={election.id}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                          {election.title}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {election.date}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {election.positions}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {election.voters}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {election.turnout}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            to={`/admin/reports/${election.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View Report
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </SecureCard>
    </div>
  );
};

export default ElectionReports;
