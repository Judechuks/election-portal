import { Link } from "react-router-dom";
import { FaChartPie } from "react-icons/fa6";
import { useAuth } from "../../context";
import AnimatedHeader from "../../components/ui/AnimatedHeader";
import HomeCard from "../../components/ui/HomeCard";

const Home = () => {
  const { user } = useAuth();

  return (
    // <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
    <section className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <article className="text-center">
        <AnimatedHeader
          title="NOCEN ELECTION PORTAL"
          subtitle="Your voice matters in shaping our community"
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Voting Card */}
          <section className="rounded-xl shadow-around overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:shadow-gray-600 bg-white dark:bg-gray-800">
            <div className="h-full p-8 flex flex-col">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-300">
                Cast Your Vote
              </h3>
              <p className="flex-1 mt-2 text-base text-gray-500">
                Participate in current elections and make your voice heard in
                student government decisions.
              </p>
              <div className="mt-6">
                {user ? (
                  <Link
                    to="/student"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    View Elections
                  </Link>
                ) : (
                  <Link
                    to="/signin"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Sign In to Vote
                  </Link>
                )}
              </div>
            </div>
          </section>

          {/* Live Results Card */}
          <HomeCard
            svg={<FaChartPie className="h-6 w-6" />}
            title="Live Results"
            desc="See real-time results from ongoing elections and historical data
            from past votes."
            linkText="View Live Results"
            href="/live-results"
            bg_color="bg-green-500"
            hover_color="bg-green-700"
          />

          {/* Completed Result Card */}
          <HomeCard
            svg={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            }
            title="Election Results"
            desc="View the final outcomes from concluded elections, see who earned the people's mandate."
            linkText="View Results"
            href="/results"
            bg_color="bg-purple-600"
            hover_color="bg-purple-700"
          />

          {/* Information Card */}
          {/* <section className="rounded-xl shadow-around overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:shadow-gray-600 bg-white dark:bg-gray-800">
            <div className="h-full p-8 flex flex-col">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-300">
                Election Information
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Learn about the election process, candidate platforms, and
                important dates.
              </p>
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700">
                  Learn More
                </button>
              </div>
            </div>
          </section> */}
        </div>
      </article>
    </section>
  );
};

export default Home;
