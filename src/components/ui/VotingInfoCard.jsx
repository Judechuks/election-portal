import React from "react";

const VotingInfoCard = () => {
  return (
    <section className="mt-6 rounded-lg p-6 border border-blue-200 bg-blue-50 dark:bg-gray-800">
      <article className="flex gap-2 items-center">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-blue-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-sm font-medium text-blue-800 dark:text-gray-400">
          Voting Information
        </h3>
      </article>
      <article className="">
        <div className="mt-2 text-sm text-blue-700 dark:text-gray-400">
          <p>
            Your vote is anonymous and cannot be traced back to you. Once
            submitted, votes cannot be changed.
          </p>
        </div>
      </article>
    </section>
  );
};

export default VotingInfoCard;
