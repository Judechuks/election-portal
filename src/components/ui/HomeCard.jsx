import { Link } from "react-router-dom";

const HomeCard = ({
  bg_color,
  hover_color,
  svg,
  href,
  title,
  desc,
  linkText,
}) => {
  return (
    <section className="rounded-xl shadow-around overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:shadow-gray-600 bg-white dark:bg-gray-800">
      <div className="p-8">
        <div
          className={`flex items-center justify-center h-12 w-12 rounded-md ${bg_color} text-white`}
        >
          {svg}
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-300">
          {title}
        </h3>
        <p className="mt-2 text-base text-gray-500">{desc}</p>
        <div className="mt-6">
          <Link
            to={href}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${bg_color} hover:${hover_color}`}
          >
            {linkText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeCard;
