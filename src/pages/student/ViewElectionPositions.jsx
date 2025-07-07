import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  UserGroupIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";
import { backendUrl } from "../../util";
import useGetElection from "../../hooks/useGetElection";
import ErrorMsg from "../../components/message/ErrorMsg";
import UserThumbnail from "../../components/ui/UserThumbnail";

const ViewElectionPositions = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedPosition, setExpandedPosition] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const {
    election,
    isLoading: loading,
    error: isError,
  } = useGetElection(electionId);

  useEffect(() => {
    setError(isError);
    setIsLoading(loading);
  }, [isError, loading]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${backendUrl}/api/elections/${electionId}/positions`
        );
        if (response.ok) {
          const result = await response.json();
          setPositions(result);
        } else {
          setError(`Could not fetch position: ${response.status}`);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (election) {
      fetchData();
    }
  }, [election, electionId]);

  const togglePosition = (positionId) => {
    setExpandedPosition(expandedPosition === positionId ? null : positionId);
    setSelectedCandidate(null);
  };

  const handleViewCandidate = (candidate, e) => {
    e.stopPropagation();
    setSelectedCandidate(candidate);
  };

  const getTimeRemaining = () => {
    if (!election?.end_datetime) return "";

    const endDate = new Date(election.end_datetime);
    const now = new Date();
    const diff = endDate - now;

    if (diff <= 0) return "Voting has ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `${days}d ${hours}h remaining`;
  };

  if (isLoading) {
    return (
      <section className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </section>
    );
  }

  if (error) {
    <ErrorMsg error={error} />;
  }

  return (
    <section className="max-w-7xl mx-auto min-h-screen bg-gradient-to-b from-gray-50 to-gray-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="px-4 py-2 bg-white dark:bg-gray-800 shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center ml-auto px-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back
        </button>
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center uppercase">
            {election.title}
          </h1>
          {/* <div className="w-6"></div>*/} {/* Spacer for alignment */}
        </div>
      </header>

      {/* Election Info Banner */}
      <article className="max-w-7xl mx-auto bg-blue-500 dark:bg-blue-800 text-white py-4">
        <div className="px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-2 md:mb-0">
            <InformationCircleIcon className="h-6 w-6 mr-2" />
            <p className="text-sm md:text-base">{election?.description}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
            {getTimeRemaining()}
          </div>
        </div>
      </article>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Positions Section */}
        <section aria-labelledby="positions-heading" className="mb-12">
          <div className="flex items-center justify-between flex-wrap gap-y-3 mb-6">
            <h2
              id="positions-heading"
              className="text-lg sm:text-xl md:text-2xl font-bold flex items-center"
            >
              <UserGroupIcon className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
              Election Positions
            </h2>
            <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
              {positions?.length} positions
            </span>
          </div>

          <article className="space-y-4">
            {positions.map((position) => (
              <div
                key={position.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <button
                  onClick={() => togglePosition(position.id)}
                  className="w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-expanded={expandedPosition === position.id}
                  aria-controls={`position-${position.id}-content`}
                >
                  <article className="">
                    <div className="p-3 sm:p-4 bg-white dark:bg-gray-900">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg md:text-xl font-semibold">
                          {position?.title}
                        </h3>
                        <aside className="flex items-center justify-between">
                          <span className="hidden sm:block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm mr-4">
                            {position?.candidates?.length} candidates
                          </span>
                          <svg
                            className={`h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform ${
                              expandedPosition === position.id
                                ? "rotate-180"
                                : ""
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </aside>
                      </div>
                      <span className="sm:hidden block w-fit bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm mr-4 mt-2">
                        {position?.candidates?.length} candidates
                      </span>
                    </div>
                    <p className="p-3 sm:p-6 text-gray-600 dark:text-gray-400 mt-1">
                      {position?.description}
                    </p>
                  </article>
                </button>

                {expandedPosition === position.id && (
                  <div
                    id={`position-${position.id}-content`}
                    className="px-6 py-6 border-t border-gray-300 dark:border-gray-700"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {position.candidates.map((candidate) => (
                        <div
                          key={candidate.id}
                          className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border ${
                            selectedCandidate?.id === candidate.id
                              ? "border-blue-500 dark:border-blue-400 shadow-md"
                              : "border-gray-200 dark:border-gray-600"
                          } transition-all hover:shadow-md`}
                        >
                          <div className="flex">
                            <div className="flex-shrink-0 mr-4">
                              {candidate.photo ? (
                                <img
                                  src={candidate.photo}
                                  alt={candidate.name}
                                  className="h-16 w-16 rounded-sm object-cover"
                                />
                              ) : (
                                <div className="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16 flex items-center justify-center text-gray-400">
                                  <svg
                                    className="h-8 w-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">
                                {candidate.name}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">
                                {candidate.bio}
                              </p>
                              <button
                                onClick={(e) =>
                                  handleViewCandidate(candidate, e)
                                }
                                className="mt-3 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                                aria-label={`View details for ${candidate.name}`}
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </article>
        </section>

        {/* Candidate Detail Modal */}
        {selectedCandidate && (
          <div className="fixed inset-0 z-500 bg-white dark:bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] custom-scrollbar overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Candidate Details</h3>
                  <button
                    onClick={() => setSelectedCandidate(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    aria-label="Close candidate details"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col items-center text-center">
                  {selectedCandidate.photo ? (
                    <img
                      src={selectedCandidate.photo}
                      alt={selectedCandidate.name}
                      className="h-32 w-32 rounded-full object-cover mb-4"
                    />
                  ) : (
                    <UserThumbnail />
                  )}

                  <h4 className="text-2xl font-bold">
                    {selectedCandidate.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {
                      positions.find((p) =>
                        p.candidates.some((c) => c.id === selectedCandidate.id)
                      )?.title
                    }
                  </p>
                </div>

                <div className="mt-6">
                  <h5 className="text-lg font-semibold mb-2">Candidate Bio</h5>
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedCandidate.bio}
                  </p>
                </div>

                {/* <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h5 className="text-lg font-semibold mb-3">
                    Candidate Vision
                  </h5>
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedCandidate.bio} My vision for this position includes
                    creating more opportunities for student engagement,
                    improving campus facilities, and ensuring every student's
                    voice is heard in the decision-making process.
                  </p>
                </div> */}

                <article className="mt-8 flex justify-center">
                  <button
                    onClick={() => navigate(`/student/vote/${electionId}`)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors"
                    aria-label="Vote in this election"
                  >
                    Vote in This Election
                  </button>
                </article>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
            This information is provided for educational purposes only.
          </p>
        </div>
      </footer>
    </section>
  );
};

export default ViewElectionPositions;
