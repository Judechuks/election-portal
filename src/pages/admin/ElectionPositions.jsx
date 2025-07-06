import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  UserGroupIcon,
  UserCircleIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";

const ElectionPositions = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const [election, setElection] = useState(null);
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("positions");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);

  // Simulated API calls with mock data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock election data
        const mockElection = {
          id: electionId,
          title: "NOCEN SU ELECTION",
          description:
            "Annual Student Union Elections for Nwafor Orizu College of Education",
          status: "active",
        };

        // Mock positions data (from your endpoint)
        const mockPositions = [
          {
            id: 6,
            title: "Financial Secretary",
            description:
              "The office of financial secretary of the student union—to handle the student union's finances.",
            election: 2,
            candidates: [
              {
                id: 4,
                name: "Boss ThankGod",
                bio: "This is a brief introduction of Boss ThankGod. He is contesting for the position of the financial secretary.",
                photo:
                  "https://nocen-nelsonterdoo.pythonanywhere.com/media/candidate_photos/team3.jpg",
                position: 6,
              },
              {
                id: 7,
                name: "Florence John",
                bio: "This is a brief introduction of Florence John. He is contesting for the position of financial secretary.",
                photo:
                  "https://nocen-nelsonterdoo.pythonanywhere.com/media/candidate_photos/employee2.jpg",
                position: 6,
              },
            ],
          },
          {
            id: 4,
            title: "SU President",
            description:
              "The office of president of the student union—to handle the student union executive roles.",
            election: 2,
            candidates: [
              {
                id: 5,
                name: "John Doe",
                bio: "This is a brief introduction of John Doe. He is contesting for the position of SU President.",
                photo:
                  "https://nocen-nelsonterdoo.pythonanywhere.com/media/candidate_photos/team2.jpg",
                position: 4,
              },
              {
                id: 2,
                name: "Jude Monye",
                bio: "This is a brief introduction of Jude Monye. He is contesting for the position of SU President.",
                photo:
                  "https://nocen-nelsonterdoo.pythonanywhere.com/media/candidate_photos/employee1.jpg",
                position: 4,
              },
            ],
          },
          {
            id: 5,
            title: "Vice President",
            description:
              "The office of the vice president of the student union—to assist the student union president.",
            election: 2,
            candidates: [
              {
                id: 6,
                name: "Joshua Agbideygbogh",
                bio: "This is a brief introduction of Joshua Agbideygbogh. He is contesting for the position of Vice President.",
                photo:
                  "https://nocen-nelsonterdoo.pythonanywhere.com/media/candidate_photos/team4.jpg",
                position: 5,
              },
              {
                id: 3,
                name: "Terdoo Nelson Nondo",
                bio: "This is a brief introduction of Terdoo Nelson Nondo. He is contesting for the position of Vice President.",
                photo:
                  "https://nocen-nelsonterdoo.pythonanywhere.com/media/candidate_photos/team1.jpg",
                position: 5,
              },
            ],
          },
        ];

        setElection(mockElection);
        setPositions(mockPositions);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [electionId]);

  const openPositionModal = (position = null) => {
    setCurrentPosition(position);
    setIsModalOpen(true);
  };

  const handleSavePosition = () => {
    // Save logic here
    setIsModalOpen(false);
  };

  const handleDeletePosition = (positionId) => {
    // Delete logic here
    console.log("Deleting position:", positionId);
  };

  const navigateToCandidates = (positionId) => {
    navigate(
      `/admin/elections/${electionId}/positions/${positionId}/candidates`
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <Link
              to={`/admin/elections/${electionId}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-1" />
              Back to Election
            </Link>
            <h1 className="text-3xl font-bold mt-2">{election.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {election.description}
            </p>
          </div>
          <button
            onClick={() => openPositionModal()}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
            aria-label="Add new position"
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            Add Position
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("positions")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "positions"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              aria-label="View positions"
            >
              <div className="flex items-center">
                <UserGroupIcon className="h-5 w-5 mr-2" />
                Positions
              </div>
            </button>
            <button
              onClick={() => setActiveTab("candidates")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "candidates"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              aria-label="View candidates"
            >
              <div className="flex items-center">
                <UserCircleIcon className="h-5 w-5 mr-2" />
                Candidates
              </div>
            </button>
          </nav>
        </div>

        {/* Positions Tab */}
        {activeTab === "positions" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {positions.map((position) => (
              <div
                key={position.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold mb-1">
                        {position.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {position.description}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openPositionModal(position)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        aria-label={`Edit ${position.title}`}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeletePosition(position.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        aria-label={`Delete ${position.title}`}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Candidates ({position.candidates.length})
                    </h3>
                    <div className="space-y-3">
                      {position.candidates.slice(0, 3).map((candidate) => (
                        <div key={candidate.id} className="flex items-center">
                          <div className="flex-shrink-0">
                            {candidate.photo ? (
                              <img
                                src={candidate.photo}
                                alt={candidate.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium">
                              {candidate.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[160px]">
                              {candidate.bio}
                            </p>
                          </div>
                        </div>
                      ))}
                      {position.candidates.length > 3 && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          +{position.candidates.length - 3} more candidates
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => navigateToCandidates(position.id)}
                    className="mt-6 w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                    aria-label={`Manage candidates for ${position.title}`}
                  >
                    Manage Candidates
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Candidates Tab */}
        {activeTab === "candidates" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {positions.flatMap((position) =>
                  position.candidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col items-center text-center">
                        {candidate.photo ? (
                          <img
                            src={candidate.photo}
                            alt={candidate.name}
                            className="h-24 w-24 rounded-full object-cover mb-4"
                          />
                        ) : (
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mb-4" />
                        )}
                        <h3 className="text-lg font-semibold">
                          {candidate.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {
                            positions.find((p) => p.id === candidate.position)
                              ?.title
                          }
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                          {candidate.bio}
                        </p>
                      </div>

                      <div className="mt-4 flex justify-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                          <PencilIcon
                            className="h-5 w-5"
                            aria-label={`Edit ${candidate.name}`}
                          />
                        </button>
                        <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                          <TrashIcon
                            className="h-5 w-5"
                            aria-label={`Delete ${candidate.name}`}
                          />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {positions.length === 0 && activeTab === "positions" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
            <UserGroupIcon className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500" />
            <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">
              No positions created
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Get started by creating a new position for this election.
            </p>
            <div className="mt-6">
              <button
                onClick={() => openPositionModal()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
                aria-label="Add new position"
              >
                <PlusIcon className="h-5 w-5 mr-1" />
                Add Position
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Position Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {currentPosition ? "Edit Position" : "Add New Position"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Position Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    defaultValue={currentPosition?.title || ""}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., SU President"
                    aria-label="Position title"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    defaultValue={currentPosition?.description || ""}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Describe the responsibilities of this position"
                    aria-label="Position description"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  aria-label="Cancel"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePosition}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                  aria-label={
                    currentPosition ? "Save changes" : "Create position"
                  }
                >
                  {currentPosition ? "Save Changes" : "Create Position"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Position Candidates Component
const PositionCandidates = () => {
  const { electionId, positionId } = useParams();
  const navigate = useNavigate();
  const [position, setPosition] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated API calls with mock data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock position data
        const mockPosition = {
          id: positionId,
          title: "SU President",
          description:
            "The office of president of the student union—to handle the student union executive roles.",
        };

        // Mock candidates data (from your endpoint)
        const mockCandidates = [
          {
            id: 5,
            name: "John Doe",
            bio: "This is a brief introduction of John Doe. He is contesting for the position of SU President.",
            photo:
              "https://nocen-nelsonterdoo.pythonanywhere.com/media/candidate_photos/team2.jpg",
            position: positionId,
          },
          {
            id: 2,
            name: "Jude Monye",
            bio: "This is a brief introduction of Jude Monye. He is contesting for the position of SU President.",
            photo:
              "https://nocen-nelsonterdoo.pythonanywhere.com/media/candidate_photos/employee1.jpg",
            position: positionId,
          },
        ];

        setPosition(mockPosition);
        setCandidates(mockCandidates);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [electionId, positionId]);

  const openCandidateModal = (candidate = null) => {
    // Candidate modal logic
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <Link
              to={`/admin/elections/${electionId}/positions`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              aria-label="Back to positions"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-1" />
              Back to Positions
            </Link>
            <h1 className="text-3xl font-bold mt-2">{position.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {position.description}
            </p>
          </div>
          <button
            onClick={() => openCandidateModal()}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
            aria-label="Add new candidate"
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            Add Candidate
          </button>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  {candidate.photo ? (
                    <img
                      src={candidate.photo}
                      alt={candidate.name}
                      className="h-32 w-32 rounded-full object-cover mb-4"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mb-4" />
                  )}
                  <h2 className="text-xl font-semibold">{candidate.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Position: {position.title}
                  </p>
                  <p className="mt-4 text-gray-700 dark:text-gray-300 line-clamp-3">
                    {candidate.bio}
                  </p>
                </div>

                <div className="mt-6 flex justify-center space-x-3">
                  <button
                    onClick={() => openCandidateModal(candidate)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    aria-label={`Edit ${candidate.name}`}
                  >
                    <PencilIcon className="h-4 w-4 mr-1 inline" />
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      console.log("Delete candidate:", candidate.id)
                    }
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                    aria-label={`Delete ${candidate.name}`}
                  >
                    <TrashIcon className="h-4 w-4 mr-1 inline" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {candidates.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
            <UserCircleIcon className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500" />
            <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">
              No candidates added
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Get started by adding candidates to this position.
            </p>
            <div className="mt-6">
              <button
                onClick={() => openCandidateModal()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
                aria-label="Add new candidate"
              >
                <PlusIcon className="h-5 w-5 mr-1" />
                Add Candidate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { ElectionPositions, PositionCandidates };
