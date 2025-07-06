import {
  CalendarIcon,
  ChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import AnimatedHeader from "../../components/ui/AnimatedHeader";
import useFetchElections from "../../hooks/useFetchElections";
import ErrorMsg from "../../components/message/ErrorMsg";
import { useAuth } from "../../context";

const ActiveElections = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { elections, isLoading, error } = useFetchElections();

  const activeElections = elections.filter(
    (election) => election.status === "active"
  );

  if (isLoading) {
    return (
      <section className="max-w-7xl h-[calc(100vh-70px)] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </section>
    );
  }

  if (error) {
    return <ErrorMsg error={error} />;
  }

  if (activeElections.length === 0) {
    return (
      <section className="max-w-7xl h-[calc(100vh-70px)] mx-auto px-4 sm:px-6 lg:px-8 py-8 grid place-content-center">
        <article className="text-center ">
          <svg
            className="mx-auto h-20 w-20 text-gray-400"
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
          <h3 className="mt-2 text-xl font-medium text-gray-900 dark:text-gray-200">
            No active elections
          </h3>
          <p className="text-gray-800 dark:text-gray-400">
            There are currently no active elections.
          </p>
        </article>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="text-center mb-10">
        <AnimatedHeader
          title="Active Election"
          subtitle="Track Live Results Ongoing Elections in Real Time"
        />
      </header>

      <section className="space-y-6 grid md:grid-cols-2 gap-6">
        {activeElections.map((election) => (
          <article
            key={election.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-around overflow-hidden h-full flex flex-col"
          >
            <section className="relative py-6 px-4 md:px-6 flex-1">
              <header className="">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {election.title}
                  </h2>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    {election.description}
                  </p>
                </div>
                <span className="absolute top-0 right-0 inline-flex items-center px-2.5 py-0.5 rounded-br-2xl-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  Active
                </span>
              </header>

              <div className="mt-6 grid grid-cols-1 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    Election Dates
                  </h3>
                  <div className="flex items-center flex-wrap gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Start Date
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(election?.start_datetime)?.toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        End Date
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(election?.end_datetime)?.toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                    <UserGroupIcon className="h-4 w-4 mr-1" />
                    Participation
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total Candidates
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {election.positions.reduce((sum, position) => {
                          return sum + position.candidates.length;
                        }, 0)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Positions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {election.positions.map((position, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                    >
                      {position.position_title}
                    </span>
                  ))}
                </div>
              </div>
            </section>
            <footer className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex flex-wrap gap-3 justify-between items-center">
              <div className="flex items-center">
                <ChartBarIcon className="h-5 w-5 text-gray-400 dark:text-gray-300 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Live results are available
                </span>
              </div>
              <div className="flex gap-2 ml-auto">
                {user && (
                  <button
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() =>
                      navigate(`/student/positions/${election.id}`)
                    }
                  >
                    View Positions
                  </button>
                )}
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => navigate(`/live-results/${election.id}`)}
                >
                  View Result
                </button>
              </div>
            </footer>
          </article>
        ))}
      </section>

      <article className="mt-8 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-lg p-4 sm:p-6 border border-yellow-100 dark:border-yellow-800">
        <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">
          Important Notice
        </h3>
        <p className="text-yellow-700 dark:text-yellow-300">
          Voting is only available during the specified election dates. Make
          sure to cast your vote before the deadline to ensure your voice is
          heard in these important elections.
        </p>
      </article>
    </section>
  );
};

export default ActiveElections;
