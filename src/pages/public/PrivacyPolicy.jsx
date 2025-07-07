import { ShieldCheckIcon, LockClosedIcon } from "@heroicons/react/outline";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information We Collect",
      content: [
        "When you vote in student elections, we collect your student ID to verify eligibility but do not link it to your vote choices.",
        "We collect technical information about your device and browser for security purposes.",
        "If you contact us, we collect your email address and correspondence.",
      ],
    },
    {
      title: "How We Use Your Information",
      content: [
        "To verify your eligibility to vote in student elections.",
        "To maintain the security and integrity of the voting process.",
        "To communicate with you about election-related matters.",
        "To generate anonymized statistical reports about voter participation.",
      ],
    },
    {
      title: "Information Sharing",
      content: [
        "We do not share your personal information with third parties except as required by college policy or law.",
        "Anonymized, aggregated data may be shared with student government and college administration.",
        "Election results are published without any voter-identifying information.",
      ],
    },
    {
      title: "Data Security",
      content: [
        "We implement appropriate technical and organizational measures to protect your personal information.",
        "Voting data is encrypted both in transit and at rest.",
        "Access to personal data is restricted to authorized election officials.",
      ],
    },
    {
      title: "Your Rights",
      content: [
        "You may request access to the personal information we hold about you.",
        "You may request correction of inaccurate personal information.",
        "You may lodge a complaint with the college data protection officer if you believe your rights have been violated.",
      ],
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb8">
        <div className="flex items-center">
          <ShieldCheckIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Privacy Policy
          </h1>
        </div>
        {/* <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
          Last updated: October 1, 2023
        </p> */}
      </header>

      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          This Privacy Policy describes how your personal information is
          collected, used, and shared when you participate in student union
          elections through our platform. We are committed to protecting your
          privacy and ensuring the integrity of the electoral process.
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
                      <LockClosedIcon className="h-5 w-5" />
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
      </article>

      <section className="grid md:grid-cols-2 gap-6 mb-8">
        <article className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg p-6 border border-blue-100 dark:border-blue-800">
          <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">
            Data Retention
          </h3>
          <p className="text-blue-700 dark:text-blue-300">
            We retain voter eligibility records for 3 years after graduation or
            last enrollment. Voting records are anonymized immediately after
            election certification and retained indefinitely for audit purposes.
          </p>
        </article>

        <article className="bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg p-6 border border-purple-100 dark:border-purple-800">
          <h3 className="text-lg font-medium text-purple-800 dark:text-purple-200 mb-2">
            Changes to This Policy
          </h3>
          <p className="text-purple-700 dark:text-purple-300">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date.
          </p>
        </article>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-around p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Contact Us
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          For more information about our privacy practices, if you have
          questions, or if you would like to make a complaint, please contact us
          by email at <span className="font-medium">info@nocen.edu.ng</span> or
          using the details provided below:
        </p>
        <address className="text-gray-600 dark:text-gray-300 not-italic">
          <ul>
            <li>+234 703 103 3232</li>
            <li>1 College Road Nsugbe,</li>
            <li>Anambra State</li>
          </ul>
        </address>
      </section>
    </section>
  );
};

export default PrivacyPolicy;
