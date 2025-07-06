import { useState, useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import {
  PlayIcon,
  StopIcon,
  PencilIcon,
  ChartBarIcon,
} from "@heroicons/react/outline";
import { useAuth } from "../../context";
import SecureCard from "../ui/SecureCard";
import AuditLogViewer from "./AuditLogViewer";

const ElectionDashboard = () => {
  const [elections, setElections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");
  const [isProcessing, setIsProcessing] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();
  const context = useOutletContext();

  useEffect(() => {
    // Simulate API fetch
    const fetchElections = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        const mockData = [
          {
            id: "1",
            title: "Student Union President 2023",
            description: "Election for the Student Union President position",
            startDate: "2023-10-01T08:00:00Z",
            endDate: "2023-10-07T20:00:00Z",
            status: "active",
            positions: 1,
            candidates: 4,
            voters: 1250,
            votesCast: 876,
          },
          {
            id: "2",
            title: "Faculty Representatives",
            description: "Election for faculty representatives",
            startDate: "2023-11-01T08:00:00Z",
            endDate: "2023-11-07T20:00:00Z",
            status: "upcoming",
            positions: 3,
            candidates: 8,
            voters: 1250,
            votesCast: 0,
          },
          {
            id: "3",
            title: "Student Union President 2022",
            description: "Election for the Student Union President position",
            startDate: "2022-10-01T08:00:00Z",
            endDate: "2022-10-07T20:00:00Z",
            status: "completed",
            positions: 1,
            candidates: 3,
            voters: 1200,
            votesCast: 950,
          },
        ];
        setElections(mockData);
      } catch (error) {
        console.error("Failed to fetch elections:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchElections();
  }, []);

  const filteredElections = elections.filter((election) => {
    if (activeTab === "active") return election.status === "active";
    if (activeTab === "upcoming") return election.status === "upcoming";
    if (activeTab === "completed") return election.status === "completed";
    return true;
  });

  const handleStartElection = async (electionId) => {
    setIsProcessing(true);
    try {
      // Simulate API call to start election
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setElections((prev) =>
        prev.map((election) =>
          election.id === electionId
            ? { ...election, status: "active" }
            : election
        )
      );

      // In a real app, you would show a success notification
      console.log(`Election ${electionId} started successfully`);
    } catch (error) {
      console.error("Failed to start election:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEndElection = async (electionId) => {
    setIsProcessing(true);
    try {
      // Simulate API call to end election
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setElections((prev) =>
        prev.map((election) =>
          election.id === electionId
            ? { ...election, status: "completed" }
            : election
        )
      );

      // In a real app, you would show a success notification
      console.log(`Election ${electionId} ended successfully`);
    } catch (error) {
      console.error("Failed to end election:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleManageElection = (election) => {
    // Different management views based on election status
    if (election.status === "active") {
      navigate(`/admin/elections/${election.id}/voters`);
    } else if (election.status === "upcoming") {
      navigate(`/admin/elections/${election.id}/positions`);
    } else {
      navigate(`/admin/reports/${election.id}`);
    }
  };

  const getElectionStatusBadge = (status) => {
    const baseClasses =
      "inline-flex items-center px-2.5 py-0.5 my-1 rounded-full text-xs font-medium";

    switch (status) {
      case "active":
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100`;
      case "upcoming":
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100`;
      case "completed":
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`;
      default:
        return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100`;
    }
  };

  const getActionButtons = (election) => {
    switch (election.status) {
      case "active":
        return (
          <>
            <button
              onClick={() => handleManageElection(election)}
              className="w-full flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              <PencilIcon className="-ml-1 mr-1 h-4 w-4" />
              Manage
            </button>
            <button
              onClick={() => handleEndElection(election.id)}
              disabled={isProcessing}
              className="w-full flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              <StopIcon className="-ml-1 mr-1 h-4 w-4" />
              {isProcessing ? "Ending..." : "End Election"}
            </button>
          </>
        );
      case "upcoming":
        return (
          <>
            <button
              onClick={() => handleManageElection(election)}
              className="w-full inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              <PencilIcon className="-ml-1 mr-1 h-4 w-4" />
              Manage
            </button>
            <button
              onClick={() => handleStartElection(election.id)}
              disabled={isProcessing}
              className="w-full inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              <PlayIcon className="-ml-1 mr-1 h-4 w-4" />
              {isProcessing ? "Starting..." : "Start Election"}
            </button>
          </>
        );
      case "completed":
        return (
          <>
            <button
              onClick={() => handleManageElection(election)}
              className="w-full flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              <ChartBarIcon className="-ml-1 mr-1 h-4 w-4" />
              View Report
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <section className="space-y-8">
      <article className="flex justify-between items-start flex-wrap gap-x-2 gap-y-3">
        <aside>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-300">
            Election Management
          </h1>
          <p className="text-md text-gray-500">
            Manage and oversee student elections.
          </p>
        </aside>
        <Link
          to="/admin/elections/create"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create New Election
        </Link>
      </article>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4 overflow-y-auto w-full custom-scrollbar">
          <button
            onClick={() => setActiveTab("active")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "active"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "upcoming"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "completed"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Completed
          </button>
        </nav>
      </div>

      {isLoading ? (
        <section className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </section>
      ) : (
        <>
          {filteredElections.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                No {activeTab} elections
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {activeTab === "active"
                  ? "There are currently no active elections."
                  : activeTab === "upcoming"
                  ? "No upcoming elections have been scheduled."
                  : "No completed elections to display."}
              </p>
            </div>
          ) : (
            <div
              className={`grid md:grid-cols-2 xl:grid-cols-${
                context.isMenuOpen ? 3 : 2
              } gap-6`}
            >
              {filteredElections.map((election) => (
                <SecureCard
                  key={election.id}
                  className="hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start my-3">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">
                        {election.title}
                      </h3>
                      <span className={getElectionStatusBadge(election.status)}>
                        {election.status.charAt(0).toUpperCase() +
                          election.status.slice(1)}
                      </span>
                    </div>
                    <p className="mt-1 text-md text-gray-600 dark:text-gray-400">
                      {election.description}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <p className="text-md font-medium text-gray-500">
                          Positions:
                        </p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                          {election.positions}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-md font-medium text-gray-500">
                          Candidates:
                        </p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                          {election.candidates}
                        </p>
                      </div>
                      <div>
                        <p className="text-md font-medium text-gray-500">
                          Eligible Voters
                        </p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                          {election.voters.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-md font-medium text-gray-500">
                          Votes Cast
                        </p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                          {election.votesCast.toLocaleString()} (
                          {Math.round(
                            (election.votesCast / election.voters) * 100
                          )}
                          %)
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="mt-4 text-md font-medium text-gray-500">
                        Time Frame
                      </p>
                      <p className="text-sm text-gray-800 dark:text-gray-300">
                        {new Date(election.startDate).toLocaleDateString()} -{" "}
                        {new Date(election.endDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600 flex justify-between items-center">
                      <div className="w-full flex space-x-2">
                        {getActionButtons(election)}
                      </div>
                    </div>
                  </div>
                </SecureCard>
              ))}
            </div>
          )}
        </>
      )}

      {user && user.role === "admin" && (
        <div className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-300">
            Recent Audit Logs
          </h2>
          <AuditLogViewer logs={[]} />
        </div>
      )}
    </section>
  );
};

export default ElectionDashboard;
