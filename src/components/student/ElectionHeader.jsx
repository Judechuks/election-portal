import RealTimeBadge from "../ui/RealTimeBadge";

const ElectionHeader = ({ election, timeLeft, hasVoted }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-around dark:shadow-gray-300 bg-white dark:bg-gray-800">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
              {election.title}
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              {election.description}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <RealTimeBadge />
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[0.81rem] font-medium whitespace-nowrap bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              {timeLeft}
            </span>
          </div>
        </div>

        {!hasVoted && (
          <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Please select one candidate for each position. Your vote is
              anonymous and cannot be changed once submitted.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElectionHeader;
