import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="xl:grid xl:grid-cols-5 xl:gap-8">
          <aside className="space-y-8 xl:col-span-2">
            <div className="flex items-center flex-wrap gap-y-2">
              <img
                src={logo}
                alt="NOCEN Election portal"
                className="h-18 w-22"
              />
              <aside className="ml-2 text-lg font-bold text-gray-900 dark:text-gray-200">
                <div>Nwafor Orizu</div>
                <div>College of Education,</div>
                <div>Nsugbe</div>
              </aside>
            </div>
            <p className="text-gray-500 dark:text-gray-300">
              A secure digital platform for student union elections and voting.
            </p>
            {/* Social Media Links */}
            <article className="flex space-x-4">
              <a
                href="https://facebook.com/nocenng"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://instagram.com/nocenng"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-pink-500 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
            </article>
          </aside>
          <aside className="mt-12 grid min-[310px]:grid-cols-2 gap-8 xl:mt-0 xl:col-span-3">
            <article className="">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 tracking-wider uppercase">
                Voting
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    to="/how-to-vote"
                    className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-300"
                  >
                    How to Vote
                  </Link>
                </li>
                <li>
                  <Link
                    to="/results"
                    className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-300"
                  >
                    Results
                  </Link>
                </li>
                <li>
                  <Link
                    to="/live-results"
                    className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-300"
                  >
                    Live Results
                  </Link>
                </li>
              </ul>
            </article>
            <article className="">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 tracking-wider uppercase">
                Policies
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    to="/election-rules"
                    className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-300"
                  >
                    Election Rules
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-of-service"
                    className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-300"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </article>
          </aside>
        </article>
        <article className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Nwafor Orizu College of Education,
            Nsugbe | All Right Reserved
          </p>
        </article>
      </div>
    </footer>
  );
};

export default Footer;
