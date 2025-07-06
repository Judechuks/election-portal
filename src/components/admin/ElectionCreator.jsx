import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon, TrashIcon, CalendarIcon } from "@heroicons/react/outline";
import SecureCard from "../ui/SecureCard";

const ElectionCreator = () => {
  const navigate = useNavigate();
  const [election, setElection] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    positions: [
      {
        id: Date.now(),
        title: "",
        description: "",
        candidates: [],
      },
    ],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElection((prev) => ({ ...prev, [name]: value }));
  };

  const handlePositionChange = (positionId, field, value) => {
    setElection((prev) => ({
      ...prev,
      positions: prev.positions.map((pos) =>
        pos.id === positionId ? { ...pos, [field]: value } : pos
      ),
    }));
  };

  const addPosition = () => {
    setElection((prev) => ({
      ...prev,
      positions: [
        ...prev.positions,
        {
          id: Date.now(),
          title: "",
          description: "",
          candidates: [],
        },
      ],
    }));
  };

  const removePosition = (positionId) => {
    if (election.positions.length <= 1) return;
    setElection((prev) => ({
      ...prev,
      positions: prev.positions.filter((pos) => pos.id !== positionId),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Election created:", election);
      setIsSubmitting(false);
      navigate("/admin");
    }, 1500);
  };

  return (
    <section className="max-w-4xl mx-auto space-y-6">
      <article className="flex justify-between items-start flex-wrap gap-x-2 gap-y-3">
        <aside>
          <h1 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-300">
            Create New Election
          </h1>
          <p className="text-md text-gray-500 dark:text-gray-400">
            Create election for students by entering election details.
          </p>
        </aside>
        <button
          onClick={() => navigate("/admin/elections")}
          className="ml-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
      </article>

      <SecureCard>
        <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
          <div className="p-6 space-y-6">
            <div>
              <label
                htmlFor="title"
                className="inline-block text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
              >
                Election Title <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={election.title}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-gray-300 placeholder-shown:text-gray-500 dark:placeholder-shown:text-gray-300"
                placeholder="Student Union President Election 2023"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="inline-block text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
              >
                Description <span className="text-red-600">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                required
                value={election.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-gray-300 placeholder-shown:text-gray-500 dark:placeholder-shown:text-gray-300"
                placeholder="Brief description about this election..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="startDate"
                  className="inline-block text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                >
                  Start Date & Time <span className="text-red-600">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="datetime-local"
                    id="startDate"
                    name="startDate"
                    required
                    value={election.startDate}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-gray-300"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="endDate"
                  className="inline-block text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                >
                  End Date & Time <span className="text-red-600">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="datetime-local"
                    id="endDate"
                    name="endDate"
                    required
                    value={election.endDate}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-gray-300"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-300">
                Positions
              </h2>
              <button
                type="button"
                onClick={addPosition}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusIcon className="-ml-1 mr-1 h-4 w-4" />
                Add Position
              </button>
            </div>

            {election.positions.map((position, index) => (
              <div
                key={position.id}
                className="border border-gray-200 rounded-lg p-4 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Position #{index + 1}
                  </h3>
                  {election.positions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePosition(position.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div>
                  <label
                    htmlFor={`position-title-${position.id}`}
                    className="inline-block text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                  >
                    Position Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id={`position-title-${position.id}`}
                    required
                    value={position.title}
                    onChange={(e) =>
                      handlePositionChange(position.id, "title", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-gray-300 placeholder-shown:text-gray-500 dark:placeholder-shown:text-gray-300"
                    placeholder="President, Treasurer, etc."
                  />
                </div>

                <div>
                  <label
                    htmlFor={`position-desc-${position.id}`}
                    className="inline-block text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                  >
                    Description
                  </label>
                  <textarea
                    id={`position-desc-${position.id}`}
                    rows={2}
                    value={position.description}
                    onChange={(e) =>
                      handlePositionChange(
                        position.id,
                        "description",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-gray-300 placeholder-shown:text-gray-500 dark:placeholder-shown:text-gray-300"
                    placeholder="Brief description of responsibilities..."
                  />
                </div>

                <div className="pt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    You'll add candidates to this position after creating the
                    election.
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-4 bg-gray-100 dark:bg-gray-900 text-right">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Creating..." : "Create Election"}
            </button>
          </div>
        </form>
      </SecureCard>
    </section>
  );
};

export default ElectionCreator;
