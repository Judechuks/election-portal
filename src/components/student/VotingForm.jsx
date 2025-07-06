import { useState, useEffect } from "react";

const VotingForm = ({ election, onSubmit }) => {
  const [selectedCandidates, setSelectedCandidates] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initialSelections = {};
    election.positions?.forEach((pos) => {
      initialSelections[pos.id] = null;
    });
    setSelectedCandidates(initialSelections);
  }, [election]);

  const handleSelectCandidate = (positionId, candidateId) => {
    setSelectedCandidates((prev) => ({
      ...prev,
      [positionId]: candidateId,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    await onSubmit(selectedCandidates);
    setIsSubmitting(false);
  };

  const selectedCount =
    Object.values(selectedCandidates).filter(Boolean).length;
  const totalPositions = election.positions?.length || 0;

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 dark:bg-red-900/20 dark:border-red-700">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500 dark:text-red-300"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          </div>
        </div>
      )}

      {election.positions.map((position) => (
        <div
          key={position.id}
          className="rounded-xl shadow-around dark:shadow-gray-300 overflow-hidden bg-white dark:bg-gray-800"
        >
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
                {position.title}
              </h2>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                {position.description}
              </p>
            </div>

            <fieldset>
              <legend className="sr-only">
                Candidates for {position.title}
              </legend>
              <div className="space-y-4">
                {position.candidates.map((candidate) => (
                  <div key={candidate.id} className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id={`candidate-${candidate.id}`}
                        name={`position-${position.id}`}
                        type="radio"
                        checked={
                          selectedCandidates[position.id] === candidate.id
                        }
                        onChange={() =>
                          handleSelectCandidate(position.id, candidate.id)
                        }
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                        aria-labelledby={`candidate-${candidate.id}-label`}
                      />
                    </div>
                    <div className="ml-3 flex items-center">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                        <label
                          htmlFor={`candidate-${candidate.id}`}
                          id={`candidate-${candidate.id}-label`}
                          className="cursor-pointer"
                        >
                          <img
                            src={candidate.photo}
                            alt={candidate.name}
                            className="h-full w-full object-cover"
                          />
                        </label>
                      </div>
                      <div className="ml-4">
                        <label
                          htmlFor={`candidate-${candidate.id}`}
                          className="block text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer"
                        >
                          {candidate.name}
                        </label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {candidate.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      ))}

      <div className="sticky bottom-0 border-t border-gray-200 py-4 px-6 shadow-around dark:shadow-gray-300 rounded-lg bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            {selectedCount} of {totalPositions} positions selected
          </p>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || selectedCount !== totalPositions}
            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isSubmitting || selectedCount !== totalPositions
                ? "opacity-75 cursor-not-allowed"
                : ""
            }`}
            aria-disabled={isSubmitting || selectedCount !== totalPositions}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Vote"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotingForm;
