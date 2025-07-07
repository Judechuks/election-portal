import {
  CheckCircleIcon,
  ClipboardListIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { MdOndemandVideo } from "react-icons/md";

const HowToVote = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          How to Vote in Student Union Elections
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          A step-by-step guide to participating in our democratic process
        </p>
      </header>

      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
          <ClipboardListIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
          Voting Process
        </h2>

        <ol className="space-y-6">
          <li className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                1
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Authentication
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Log in using your official college credentials. Your identity
                will be verified but your vote remains anonymous.
              </p>
            </div>
          </li>

          <li className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                2
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                View Candidates
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Review all candidates for each position, including their bios,
                photos, and campaign statements.
              </p>
            </div>
          </li>

          <li className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                3
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Make Your Selection
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Select your preferred candidate for each position. You can
                change your choices until you submit your ballot.
              </p>
            </div>
          </li>

          <li className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                4
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Submit Your Vote
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Confirm your selections and submit your ballot. You'll receive a
                confirmation that your vote was recorded.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <article className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-around p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
          <UserIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
          Eligibility
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-300">
              Must be a currently enrolled student
            </span>
          </li>
          <li className="flex items-start">
            <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-300">
              Must have valid college credentials
            </span>
          </li>
          <li className="flex items-start">
            <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-300">
              Must not have already voted in this election
            </span>
          </li>
        </ul>
      </article>

      <article className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
          <MdOndemandVideo className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
          Demo
        </h3>
        <figure>
          <iframe
            src="https://www.youtube.com/embed/your-demo-video-id"
            title="Voting Demo"
            className="w-full h-64 md:h-96 rounded-lg shadow-md"
            allowFullScreen
          ></iframe>
          <figcaption className="text-gray-600 dark:text-gray-300 mt-2">
            Watch this video for a step-by-step guide on how to vote.
          </figcaption>
        </figure>
      </article>

      <article className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg p-6 border border-blue-100 dark:border-blue-800">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">
          Need Help?
        </h3>
        <p className="text-blue-700 dark:text-blue-300 mb-4">
          If you encounter any issues while voting or have questions about the
          process, please contact the Election Committee at{" "}
          <span className="font-medium">info@nocen.edu.ng</span> or visit the
          Student Affairs office.
        </p>
        <p className="text-blue-700 dark:text-blue-300">
          Our team is available Monday-Friday from 9am to 5pm to assist you.
        </p>
      </article>
    </section>
  );
};

export default HowToVote;
