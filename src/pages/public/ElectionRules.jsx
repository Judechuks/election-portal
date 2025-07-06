import {
  DocumentTextIcon,
  ScaleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/outline";

const ElectionRules = () => {
  const rules = [
    {
      title: "Eligibility",
      items: [
        "All currently enrolled students are eligible to vote",
        "Students must verify their identity using college credentials",
        "Each student may vote only once per election",
      ],
    },
    {
      title: "Campaign Rules",
      items: [
        "Campaigning is permitted only during the official campaign period",
        "No campaign materials may be posted in prohibited areas",
        "Digital campaigning must comply with college IT policies",
        "Candidates may not use college resources for campaigning",
      ],
    },
    {
      title: "Voting Process",
      items: [
        "Voting is conducted online through the official portal",
        "The voting period is exactly one week",
        "Votes are anonymous and cannot be changed once submitted",
        "Technical issues must be reported immediately",
      ],
    },
    {
      title: "Code of Conduct",
      items: [
        "No harassment or intimidation of voters or candidates",
        "False statements about candidates are prohibited",
        "Respect must be shown to all participants",
        "Violations may result in disqualification",
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Election Rules & Procedures
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Guidelines governing student union elections
        </p>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-6">
          <DocumentTextIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mr-3" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Official Election Regulations
          </h2>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          These rules are established by the Student Union Constitution and
          enforced by the Election Committee. All participants in the election
          process (voters, candidates, and campaign staff) are expected to be
          familiar with and abide by these regulations.
        </p>

        <div className="space-y-8">
          {rules.map((section, index) => (
            <section
              key={index}
              className="border-l-4 border-indigo-200 dark:border-indigo-800 pl-4"
            >
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-indigo-500 dark:text-indigo-400 mt-0.5 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-20 rounded-lg p-6 border border-indigo-100 dark:border-indigo-800">
          <div className="flex items-center mb-3">
            <ScaleIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
            <h3 className="text-lg font-medium text-indigo-800 dark:text-indigo-200">
              Enforcement
            </h3>
          </div>
          <p className="text-indigo-700 dark:text-indigo-300">
            The Election Committee has full authority to interpret and enforce
            these rules. Alleged violations should be reported in writing within
            24 hours of the incident.
          </p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-lg p-6 border border-yellow-100 dark:border-yellow-800">
          <div className="flex items-center mb-3">
            <ShieldCheckIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-2" />
            <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200">
              Appeals Process
            </h3>
          </div>
          <p className="text-yellow-700 dark:text-yellow-300">
            Decisions of the Election Committee may be appealed to the Student
            Union Judicial Board within 48 hours. The Board's decision is final.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Full Election Policy Document
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          For complete details including bylaws, timelines, and committee
          procedures, please download the official document:
        </p>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <DocumentTextIcon className="-ml-1 mr-2 h-5 w-5" />
          Download Election Policy (PDF)
        </button>
      </div>
    </div>
  );
};

export default ElectionRules;
