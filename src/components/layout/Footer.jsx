import { AcademicCapIcon } from "@heroicons/react/outline";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <AcademicCapIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-gray-200">
                NOCEN ELECTIONS
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-300">
              A secure digital platform for student union elections and voting.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 tracking-wider uppercase">
                  Voting
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="/how-to-vote"
                      className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-300"
                    >
                      How to Vote
                    </a>
                  </li>
                  <li>
                    <a
                      href="/current-elections"
                      className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-300"
                    >
                      Current Elections
                    </a>
                  </li>
                  <li>
                    <a
                      href="/candidates"
                      className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-300"
                    >
                      Candidate Information
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 tracking-wider uppercase">
                  Results
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="/live-results"
                      className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-300"
                    >
                      Live Results
                    </a>
                  </li>
                  <li>
                    <a
                      href="/past-elections"
                      className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-300"
                    >
                      Past Elections
                    </a>
                  </li>
                  <li>
                    <a
                      href="/statistics"
                      className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-300"
                    >
                      Statistics
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 tracking-wider uppercase">
                  Policies
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="/election-rules"
                      className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-300"
                    >
                      Election Rules
                    </a>
                  </li>
                  <li>
                    <a
                      href="/privacy-policy"
                      className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-300"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/terms-of-service"
                      className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-300"
                    >
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-300"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-300"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-300"
                    >
                      Report an Issue
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Nwafor Orizu College of Education,
            Nsugbe | All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
