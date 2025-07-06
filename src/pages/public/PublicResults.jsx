import { useParams } from "react-router-dom";
import AnimatedHeader from "../../components/ui/AnimatedHeader";
import LiveResults from "../../components/public/LiveResults";

const PublicResults = () => {
  const { electionId } = useParams();

  return (
    <section className="flex-grow bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <AnimatedHeader
            title="Live Election Results"
            subtitle="Real-time updates from current election"
          />
        </div>

        <div className="shadowsm dark:shadow-gray-400 rounded-lg overflow-hidden p-[2px]">
          <LiveResults electionId={electionId} />
        </div>

        <div className="mt-8 bg-yellow-50 dark:bg-gray-700 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                These are preliminary results. Final results will be certified
                by the Election Committee after voting concludes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicResults;
