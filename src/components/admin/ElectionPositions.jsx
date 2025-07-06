import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
} from "@heroicons/react/outline";
import SecureCard from "../ui/SecureCard";

const ElectionPositions = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPosition, setNewPosition] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchPositions = async () => {
      setIsLoading(true);
      try {
        // Mock data - in real app, fetch from API
        await new Promise((resolve) => setTimeout(resolve, 600));
        const mockPositions = [
          {
            id: "1",
            title: "President",
            description:
              "The President represents the student body and chairs meetings",
            candidates: 3,
          },
          {
            id: "2",
            title: "Vice President",
            description: "Assists the President and assumes duties when needed",
            candidates: 2,
          },
        ];
        setPositions(mockPositions);
      } catch (error) {
        console.error("Failed to fetch positions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPositions();
  }, [electionId]);

  const handleAddPosition = () => {
    if (!newPosition.title.trim()) return;

    const position = {
      id: Date.now().toString(),
      ...newPosition,
      candidates: 0,
    };

    setPositions((prev) => [...prev, position]);
    setNewPosition({ title: "", description: "" });
  };

  const handleRemovePosition = (id) => {
    setPositions((prev) => prev.filter((position) => position.id !== id));
  };

  const navigateToCandidates = (positionId) => {
    navigate(
      `/admin/elections/${electionId}/positions/${positionId}/candidates`
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Manage Positions
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
        <div className="p-6 space-y-6">
          <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Add New Position
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="title"
                className="inline-block text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                Position Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={newPosition.title}
                onChange={(e) =>
                  setNewPosition({ ...newPosition, title: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="President, Treasurer, etc."
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="inline-block text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={newPosition.description}
                onChange={(e) =>
                  setNewPosition({
                    ...newPosition,
                    description: e.target.value,
                  })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Brief description of responsibilities"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleAddPosition}
              disabled={!newPosition.title.trim()}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                !newPosition.title.trim() ? "opacity-50 cursor-not-allowed" : ""
              }`}
              cursor-not-allowed
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              Add Position
            </button>
          </div>
        </div>
      </SecureCard>

      <SecureCard>
        <div className="p-6 space-y-6">
          <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Current Positions
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {positions.length} position{positions.length !== 1 ? "s" : ""} in
              this election
            </p>
          </div>

          {isLoading ? (
            <section className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </section>
          ) : positions.length === 0 ? (
            <section className="text-center py-8">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No positions added yet
              </p>
            </section>
          ) : (
            <section className="overflow-auto custom-scrollbar border border-gray-200 dark:border-gray-600 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Position
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Candidates
                    </th>
                    <th
                      scope="col"
                      className="relative px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      <span className="sronly">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-600">
                  {positions.map((position) => (
                    <tr
                      key={position.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {position.title}
                      </td>
                      <td className="max-w-md min-w-sm px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {position.description}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-400">
                        {position.candidates}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                          onClick={() => navigateToCandidates(position.id)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <PencilIcon className="h-4 w-4 inline-block" /> Manage
                        </button>
                        <button
                          onClick={() => handleRemovePosition(position.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <TrashIcon className="h-4 w-4 inline-block" /> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </div>
      </SecureCard>
    </div>
  );
};

export default ElectionPositions;
