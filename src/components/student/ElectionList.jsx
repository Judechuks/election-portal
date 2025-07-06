import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import SecureCard from "../ui/SecureCard";
import ErrorMsg from "../message/ErrorMsg";
import useFetchElections from "../../hooks/useFetchElections";

const ElectionList = () => {
  const context = useOutletContext();
  const [activeTab, setActiveTab] = useState("active");
  // date format option
  const options = { year: "numeric", month: "long", day: "numeric" }; // ('en-GB', options) Example: "29 Jun 25"
  // const options = { year: "2-digit", month: "long", day: "numeric" }; // ('en-GB', options) Example: "29 Jun 25"
  /* const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }; */ // ('en-US', options) Example: "Sunday, June 29, 2025"

  const { elections, isLoading, error } = useFetchElections();

  const filteredElections = elections.filter((election) => {
    if (activeTab === "active") return election.status === "active";
    if (activeTab === "upcoming") return election.status === "upcoming";
    if (activeTab === "closed") return election.status === "closed";
    if (activeTab === "archived") return election.status === "archived";
    return true;
  });

  // const getElectionStatus = (election) => {
  //   if (election.status === "active") {
  //     // return election.hasVoted ? "Voted" : "Vote Now";
  //     return "Vote Now";
  //   }
  //   if (election.status === "completed") {
  //     // return election.hasVoted ? "You Voted" : "Did Not Vote";
  //     return "Did Not Vote";
  //   }
  //   return "Upcoming";
  // };

  // const getStatusColor = (election) => {
  //   if (election.status === "active") {
  //     return election.hasVoted
  //       ? "bg-green-100 text-green-800"
  //       : "bg-blue-100 text-blue-800";
  //   }
  //   if (election.status === "completed") {
  //     return election.hasVoted
  //       ? "bg-green-100 text-green-800"
  //       : "bg-gray-100 text-gray-800";
  //   }
  //   return "bg-yellow-100 text-yellow-800";
  // };

  if (error) {
    return <ErrorMsg error={error} />;
  }

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          Your Elections
        </h1>
        <p className="mt-1 text-gray-700 dark:text-gray-400">
          View and participate in current elections
        </p>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-500">
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
          {/* <button
            onClick={() => setActiveTab("upcoming")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "upcoming"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Upcoming
          </button> */}
          {/* <button
            onClick={() => setActiveTab("closed")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "closed"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Closed
          </button> */}
          {/* <button
            onClick={() => setActiveTab("archived")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "archived"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Archived
          </button> */}
        </nav>
      </div>

      {isLoading ? (
        <section className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </section>
      ) : (
        <>
          {filteredElections.length === 0 ? (
            <section className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
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
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-200">
                No {activeTab} elections
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {activeTab === "active"
                  ? "There are currently no active elections."
                  : activeTab === "upcoming"
                  ? "No upcoming elections have been scheduled."
                  : "No past elections to display."}
              </p>
            </section>
          ) : (
            <section
              className={`grid gap-6 md:grid-cols-2 xl:grid-cols-${
                context.isMenuOpen ? 3 : 2
              } xl:gap-5`}
            >
              {filteredElections.map((election) => (
                <SecureCard
                  key={election.id}
                  className="hover:shadow-lg transition-shadow duration-200"
                >
                  <section className="p-6 h-full flex flex-col">
                    <article className="flex-1">
                      <div className="flex gap-3 sjustify-between items-center my-3">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">
                          {election.title}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            election.status === "active"
                              ? "bg-green-100 text-green-800"
                              : election.status === "upcoming"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {election.status.charAt(0).toUpperCase() +
                            election.status.slice(1)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {election.description}
                      </p>

                      <div className="mt-4 grid gap-2">
                        <aside className="flex gap-2 items-center flex-wrap">
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Time Frame
                          </p>
                          <p className="flex gap-1 text-sm text-gray-900 dark:text-gray-500">
                            {new Date(
                              election.start_datetime
                            ).toLocaleDateString("en-US", options)}{" "}
                            -{" "}
                            {new Date(election.end_datetime).toLocaleDateString(
                              "en-US",
                              options
                            )}
                          </p>
                        </aside>
                        <aside className="flex gap-2 items-center">
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Positions:
                          </p>
                          <p className="text-md font-semibold text-gray-900 dark:text-gray-500">
                            {election.positions.length}
                          </p>
                        </aside>
                        <aside className="flex gap-2 items-center">
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-500">
                            {election.positions
                              .map((item) => item.position_title)
                              .join(", ")}
                          </p>
                        </aside>
                      </div>
                    </article>

                    <article className="mt-6 pt-4 border-t border-gray-200 flex justify-end items-center">
                      {/* <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          election
                        )}`}
                      >
                        {getElectionStatus(election)}
                      </span> */}
                      {election.status === "active" && !election.hasVoted && (
                        <Link
                          to={`/student/vote/${election.id}`}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Vote Now
                        </Link>
                      )}
                      {election.status === "active" && election.hasVoted && (
                        <Link
                          to={`/results/${election.id}`}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          View Results
                        </Link>
                      )}
                      {election.status === "completed" && (
                        <Link
                          to={`/results/completed`}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          View Results
                        </Link>
                      )}
                    </article>
                  </section>
                </SecureCard>
              ))}
            </section>
          )}
        </>
      )}
    </section>
  );
};

export default ElectionList;
