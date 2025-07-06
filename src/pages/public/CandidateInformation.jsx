import {
  UserCircleIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  ChatAltIcon,
} from "@heroicons/react/outline";

const CandidateInformation = () => {
  const positions = [
    {
      title: "Student Union President",
      candidates: [
        {
          id: 1,
          name: "Alex Johnson",
          photo: "https://randomuser.me/api/portraits/men/32.jpg",
          program: "Political Science",
          year: "Junior",
          statement:
            "I'm committed to representing all students and improving campus life through better facilities and more student events.",
          experience: "Current SU Vice President, Debate Club President",
        },
        {
          id: 2,
          name: "Samira Khan",
          photo: "https://randomuser.me/api/portraits/women/44.jpg",
          program: "Computer Science",
          year: "Sophomore",
          statement:
            "My focus is on STEM student needs, improving lab facilities, and creating more tech-related extracurricular opportunities.",
          experience: "Computer Science Society Treasurer",
        },
      ],
    },
    {
      title: "Treasurer",
      candidates: [
        {
          id: 3,
          name: "Taylor Smith",
          photo: "https://randomuser.me/api/portraits/women/63.jpg",
          program: "Accounting",
          year: "Senior",
          statement:
            "I'll ensure transparent budgeting and responsible allocation of student activity funds to benefit all campus organizations.",
          experience: "Accounting Club President, Current SU Budget Committee",
        },
      ],
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Candidate Information
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Meet the candidates running in the current elections
        </p>
      </header>

      <article className="space-y-8">
        {positions.map((position) => (
          <section
            key={position.title}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <div className="bg-indigo-600 dark:bg-indigo-800 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">
                {position.title}
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-8">
                {position.candidates.map((candidate) => (
                  <article
                    key={candidate.id}
                    className="flex flex-col md:flex-row gap-6"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={candidate.photo}
                        alt={`${candidate.name}'s profile`}
                        className="h-32 w-32 rounded-full object-cover border-4 border-indigo-100 dark:border-indigo-900"
                        aria-label={`Profile photo of ${candidate.name}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {candidate.name}
                      </h3>
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <AcademicCapIcon className="flex-shrink-0 mr-1 h-4 w-4" />
                        <span>
                          {candidate.program}, {candidate.year}
                        </span>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                          <ChatAltIcon className="h-4 w-4 mr-1" />
                          Candidate Statement
                        </h4>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          {candidate.statement}
                        </p>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                          <BriefcaseIcon className="h-4 w-4 mr-1" />
                          Experience & Qualifications
                        </h4>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          {candidate.experience}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}
      </article>

      <article className="mt-8 bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-20 rounded-lg p-6 border border-indigo-100 dark:border-indigo-800">
        <h3 className="text-lg font-medium text-indigo-800 dark:text-indigo-200 mb-2">
          More Information
        </h3>
        <p className="text-indigo-700 dark:text-indigo-300">
          Candidate forums will be held on September 25th and 28th in the
          Student Union Building. All students are encouraged to attend and ask
          questions of the candidates.
        </p>
      </article>
    </section>
  );
};

export default CandidateInformation;
