import { useNavigate } from "react-router-dom";

const VoteSummary = ({ election }) => {
  const navigate = useNavigate();

  return (
    <section className="max-w-4xl mx-auto space-y-8 py-6">
      <div className="rounded-xl overflow-hidden shadow-around dark:shadow-gray-300 bg-white dark:bg-gray-800">
        <div className="px-4 py-6 sm:p-6 md:p-8">
          <header className="text-center mb-8">
            <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-4 inline-flex items-center justify-center mb-6">
              <svg
                className="h-12 w-12 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Your Vote Has Been Recorded!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Thank you for participating in the {election.title}.
            </p>
          </header>

          <section className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 sm:p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg
                className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Vote Summary
            </h2>

            <div className="space-y-6">
              {election.positions.map((position) => (
                <article
                  key={position.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
                  aria-labelledby={`position-${position.id}-title`}
                >
                  <h3
                    id={`position-${position.id}-title`}
                    className="text-lg font-medium text-gray-800 dark:text-white mb-3"
                  >
                    {position.title}
                  </h3>

                  {position.user_has_voted ? (
                    <article className="flex items-start flex-wrap gap-y-3">
                      <div className="flex-shrink-0 h-16 w-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600 mr-4">
                        <img
                          src={position.user_vote.candidate_photo}
                          alt={position.user_vote.candidate_name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {position.user_vote.candidate_name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          Voted on:{" "}
                          {new Date(
                            position.user_vote.timestamp
                          ).toLocaleString()}
                        </p>
                      </div>
                    </article>
                  ) : (
                    <article className="bg-yellow-50 dark:bg-yellow-900/20 rounded-md p-3">
                      <p className="text-yellow-700 dark:text-yellow-300 flex items-center">
                        <svg
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        You did not vote for this position
                      </p>
                    </article>
                  )}
                </article>
              ))}
            </div>
          </section>

          <article className="flex flex-col sm:flex-row justify-end gap-4">
            <button
              onClick={() => navigate("/student")}
              className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Return to Dashboard
            </button>
            <button
              onClick={() => navigate(`/live-results/${election.id}`)}
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View Live Results
            </button>
          </article>
        </div>
      </div>
    </section>
  );
};

export default VoteSummary;
