import { useNavigate } from "react-router-dom";
import { HomeIcon, ArrowRightIcon } from "@heroicons/react/outline";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-6 pb-6 text-center">
      <section className="max-w-2xl w-full">
        {/* SVG Illustration */}
        <article className="mx-auto w-62 h-62 md:w-80 md:h-80 mb-4">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="planetGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient
                id="ringGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#A78BFA" />
                <stop offset="100%" stopColor="#C4B5FD" />
              </linearGradient>
            </defs>

            {/* Planet */}
            <circle cx="100" cy="100" r="60" fill="url(#planetGradient)" />

            {/* Craters */}
            <circle cx="80" cy="80" r="8" fill="#4F46E5" opacity="0.8" />
            <circle cx="130" cy="70" r="5" fill="#4F46E5" opacity="0.8" />
            <circle cx="110" cy="130" r="6" fill="#4F46E5" opacity="0.8" />

            {/* Ring */}
            <ellipse
              cx="100"
              cy="60"
              rx="80"
              ry="20"
              fill="url(#ringGradient)"
              opacity="0.7"
            />
            <ellipse
              cx="100"
              cy="60"
              rx="70"
              ry="15"
              fill="transparent"
              stroke="#E9D5FF"
              strokeWidth="2"
            />

            {/* Astronaut */}
            <g transform="translate(140, 120) rotate(20)">
              <circle cx="0" cy="-10" r="8" fill="#FEF3C7" />
              <circle cx="-3" cy="-12" r="1" fill="#1F2937" />
              <circle cx="3" cy="-12" r="1" fill="#1F2937" />
              <path
                d="M-5,-5 Q0,5 5,-5"
                fill="none"
                stroke="#1F2937"
                strokeWidth="1.5"
              />
              <rect x="-6" y="0" width="12" height="15" rx="3" fill="#F3F4F6" />
              <rect x="-8" y="15" width="16" height="5" rx="2" fill="#F3F4F6" />
              <rect x="-10" y="5" width="5" height="10" rx="2" fill="#F3F4F6" />
              <rect x="5" y="5" width="5" height="10" rx="2" fill="#F3F4F6" />
            </g>

            {/* 404 Text */}
            <text
              x="100"
              y="190"
              textAnchor="middle"
              fontFamily="Arial"
              fontSize="24"
              fontWeight="bold"
              fill="#4F46E5"
              opacity="0.8"
            >
              404
            </text>
          </svg>
        </article>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Lost in Space?
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
          The page you're looking for doesn't exist or has been moved. Don't
          worry, we'll help you find your way back home.
        </p>

        <article className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-label="Go back to home page"
          >
            <HomeIcon className="-ml-1 mr-2 h-5 w-5" />
            Return Home
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
            aria-label="Go back to previous page"
          >
            <ArrowRightIcon className="-ml-1 mr-2 h-5 w-5 transform rotate-180" />
            Go Back
          </button>
        </article>
      </section>
    </main>
  );
};

export default NotFound;
