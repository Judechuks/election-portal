import {
  ScaleIcon,
  ExclamationIcon,
  ClipboardCheckIcon,
} from "@heroicons/react/outline";

const TermsOfService = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing or using the Student Union Election Platform ('the Platform'), you agree to be bound by these Terms of Service.",
        "If you do not agree to all the terms and conditions, you may not access or use the Platform.",
      ],
    },
    {
      title: "Eligibility",
      content: [
        "The Platform is available only to currently enrolled students of the college.",
        "You must use your official college credentials to access the Platform.",
        "By using the Platform, you represent and warrant that you meet all eligibility requirements.",
      ],
    },
    {
      title: "User Responsibilities",
      content: [
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You agree to vote only once per election and to make selections conscientiously.",
        "You will not attempt to disrupt or interfere with the voting process.",
        "You will not attempt to discover how any individual voted.",
      ],
    },
    {
      title: "Prohibited Conduct",
      content: [
        "Attempting to vote more than once in the same election.",
        "Sharing your account credentials with others.",
        "Using automated systems to access the Platform.",
        "Attempting to compromise the security or integrity of the voting system.",
      ],
    },
    {
      title: "Intellectual Property",
      content: [
        "All content and functionality of the Platform is the property of the Nwafor Orizu College of Education, Nsugbe.",
        "You may not reproduce, distribute, or create derivative works without permission.",
        "Candidate materials are provided for election purposes only.",
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center">
          <ScaleIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Terms of Service
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
          Governing your use of the Student Union Election Platform
        </p>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          These Terms of Service ("Terms") govern your access to and use of the
          Student Union Election Platform. Please read these Terms carefully
          before using the Platform.
        </p>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-indigo-500 dark:text-indigo-400 mt-0.5 mr-2">
                      <ClipboardCheckIcon className="h-5 w-5" />
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
        <div className="bg-red-50 dark:bg-red-900 dark:bg-opacity-20 rounded-lg p-6 border border-red-100 dark:border-red-800">
          <div className="flex items-center mb-3">
            <ExclamationIcon className="h-6 w-6 text-red-600 dark:text-red-400 mr-2" />
            <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
              Violations
            </h3>
          </div>
          <p className="text-red-700 dark:text-red-300">
            Violation of these Terms may result in disciplinary action under the
            Student Code of Conduct, invalidation of votes, and/or prohibition
            from future participation in student elections.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg p-6 border border-green-100 dark:border-green-800">
          <h3 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">
            Amendments
          </h3>
          <p className="text-green-700 dark:text-green-300">
            The Nwafor Orizu College of Education, Nsugbe reserves the right to
            modify these Terms at any time. Your continued use of the Platform
            after such modifications constitutes your acceptance of the new
            Terms.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Governing Law
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          These Terms shall be governed by and construed in accordance with the
          laws of the state where the college is located, without regard to its
          conflict of law provisions. Any disputes shall be resolved through the
          college's internal judicial processes.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
