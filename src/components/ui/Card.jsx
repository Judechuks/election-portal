import React from "react";

const Card = ({ icon, title, description, action, actionTitle }) => {
  return (
    <section className="p-5 shadow-around dark:shadow-gray-300 rounded-lg">
      <header className="flex gap-3 items-center border-b pb-4 border-gray-200 dark:border-gray-700">
        {icon && icon}
        {title && (
          <h2 className="capitalize font-semibold text-xl dark:text-gray-300">
            {title}
          </h2>
        )}
      </header>
      <div className="mt-4 mb-6 text-gray-500 dark:text-gray-400">
        {description && <p>{description}</p>}
      </div>
      <footer>
        {action && (
          <button
            className="w-full px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-200 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={action}
          >
            {actionTitle}
          </button>
        )}
      </footer>
    </section>
  );
};

export default Card;
