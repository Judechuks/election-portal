import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  PhotographIcon,
  ArrowLeftIcon,
} from "@heroicons/react/outline";
import SecureCard from "../ui/SecureCard";

const CandidateManager = () => {
  const { electionId, positionId } = useParams();
  const navigate = useNavigate();
  const [position, setPosition] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(null);
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    bio: "",
    photo: "",
  });

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Mock data
        await new Promise((resolve) => setTimeout(resolve, 600));
        const mockPosition = {
          id: positionId,
          title: "President",
          description:
            "The President represents the student body and chairs meetings.",
        };
        const mockCandidates = [
          {
            id: "1",
            name: "Alex Johnson",
            bio: "Third-year Political Science major with experience in student government.",
            photo: "https://randomuser.me/api/portraits/men/32.jpg",
          },
          {
            id: "2",
            name: "Samira Khan",
            bio: "Second-year Computer Science major advocating for STEM student needs.",
            photo: "https://randomuser.me/api/portraits/women/44.jpg",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCandidate = () => {
    if (!newCandidate.name.trim()) return;

    const candidate = {
      id: Date.now().toString(),
      ...newCandidate,
      photo: newCandidate.photo || "https://via.placeholder.com/150",
    };

    setCandidates((prev) => [...prev, candidate]);
    setNewCandidate({ name: "", bio: "", photo: "" });
  };

  const handleUpdateCandidate = (id) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === id ? { ...candidate, ...newCandidate } : candidate
      )
    );
    setIsEditing(null);
    setNewCandidate({ name: "", bio: "", photo: "" });
  };

  const handleEditCandidate = (candidate) => {
    setIsEditing(candidate.id);
    setNewCandidate({
      name: candidate.name,
      bio: candidate.bio,
      photo: candidate.photo,
    });
  };

  const handleRemoveCandidate = (id) => {
    setCandidates((prev) => prev.filter((candidate) => candidate.id !== id));
    if (isEditing === id) {
      setIsEditing(null);
      setNewCandidate({ name: "", bio: "", photo: "" });
    }
  };

  if (isLoading || !position) {
    return (
      <section className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </section>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Manage Candidates for {position.title}
        </h1>
        <button
          onClick={() => navigate(`/admin/elections/${electionId}`)}
          className="ml-auto inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Election
        </button>
        {/* <div className="w-24"></div> */} {/* Spacer for alignment */}
      </div>

      <SecureCard>
        <div className="p-6 md:p-8 space-y-6">
          <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Add New Candidate
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={newCandidate.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Candidate's full name"
                />
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Biography
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  value={newCandidate.bio}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Candidate's background, qualifications, and platform..."
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Photo
                </label>
                <div className="mt-1 flex items-center">
                  <span className="inline-block h-24 w-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-600">
                    {newCandidate.photo ? (
                      <img
                        src={newCandidate.photo}
                        alt="Candidate"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <PhotographIcon className="h-full w-full text-gray-300 dark:text-gray-400 p-6" />
                    )}
                  </span>
                  <span className="ml-4">
                    <input
                      type="text"
                      name="photo"
                      value={newCandidate.photo}
                      onChange={handleInputChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Image URL"
                    />
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={
                    isEditing
                      ? () => handleUpdateCandidate(isEditing)
                      : handleAddCandidate
                  }
                  disabled={!newCandidate.name.trim()}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    !newCandidate.name.trim()
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isEditing ? "Update Candidate" : "Add Candidate"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(null);
                      setNewCandidate({ name: "", bio: "", photo: "" });
                    }}
                    className="w-full mt-2 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </SecureCard>

      <SecureCard>
        <div className="p-6 md:p-8 space-y-6">
          <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Current Candidates
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {candidates.length} candidates registered
            </p>
          </div>

          {candidates.length === 0 ? (
            <div className="text-center py-8">
              <PhotographIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                No candidates
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Add candidates using the form above.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {candidates.map((candidate) => (
                <li
                  key={candidate.id}
                  className="col-span-1 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden"
                >
                  <div className="p-4 flex items-start">
                    <div className="flex-shrink-0 h-16 w-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600">
                      <img
                        src={candidate.photo}
                        alt={candidate.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {candidate.name}
                        </h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditCandidate(candidate)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleRemoveCandidate(candidate.id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {candidate.bio}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </SecureCard>
    </div>
  );
};

export default CandidateManager;
