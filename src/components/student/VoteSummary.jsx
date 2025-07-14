import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
// import { FaCrown } from "react-icons/fa";

const VoteSummary = ({ election }) => {
  const navigate = useNavigate();

  return (
    <section className="max-w-4xl mx-auto space-y-8 py-8">
      <div className="rounded-xl overflow-hidden shadow-sm dark:shadow-gray-400 transition-all duration-300">
        <div className="px-4 py-6 sm:p-6 md:p-8">
          {/* Header */}
          <header className="text-center mb-8">
            <div className="bg-green-100 dark:bg-green-800 rounded-full p-4 inline-flex items-center justify-center mb-6 animate-pulse">
              <svg
                className="h-12 w-12 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
              Vote Successfully Cast!
            </h1>
            <p className="text-lg text-gray-800 dark:text-gray-300">
              Thank you for participating in the {election.title}.
            </p>
          </header>

          {/* Vote Summary */}
          <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 sm:p-6 mb-8 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center mb-4">
              <svg
                className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Who You Voted For
            </h2>

            {election.positions.map((position) => {
              const votedCandidate = position.candidates.find(
                (c) => c.id === position.user_vote?.candidate_id
              );

              // const winner = [...position.candidates].sort(
              //   (a, b) => b.vote_count - a.vote_count
              // )[0];

              return (
                <div
                  key={position.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                    {position.title}
                  </h3>

                  {position.user_has_voted && votedCandidate ? (
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-600 overflow-hidden flex items-center justify-center">
                        {votedCandidate.photo_url ? (
                          <img
                            src={votedCandidate.photo_url}
                            alt={votedCandidate.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <BsPersonCircle size={40} className="text-gray-500" />
                        )}

                        {/* {votedCandidate.id === winner.id && (
                          <FaCrown
                            size={16}
                            className="absolute -top-2 -right-2 text-yellow-500 drop-shadow"
                            title="Current Leader"
                          />
                        )} */}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                          {votedCandidate.name}
                          {/* {votedCandidate.id === winner.id && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-yellow-100 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-100">
                              <FaCrown size={12} /> Leading
                            </span>
                          )} */}
                          <span className="ml-2 inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100">
                            Your Vote
                          </span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          Cast on:{" "}
                          {new Date(
                            position.user_vote.timestamp
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 dark:bg-yellow-800/20 text-yellow-800 dark:text-yellow-200 px-4 py-3 rounded-md text-sm flex items-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>You didn’t vote in this position</span>
                    </div>
                  )}
                </div>
              );
            })}
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <button
              onClick={() => navigate("/student")}
              className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Return to Dashboard
            </button>
            <button
              onClick={() => navigate(`/live-results/${election.id}`)}
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              View Live Results
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoteSummary;
