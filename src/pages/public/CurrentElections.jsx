import {
  CalendarIcon,
  ChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";

const CurrentElections = () => {
  const elections = [
    {
      id: 1,
      title: "Student Union President 2023",
      description: "Annual election for the Student Union leadership position",
      positions: ["President", "Vice President", "Treasurer"],
      startDate: "2023-10-01",
      endDate: "2023-10-07",
      candidates: 8,
      voters: 1250,
    },
    {
      id: 2,
      title: "Faculty Representatives",
      description: "Election for student representatives to faculty committees",
      positions: [
        "Science Faculty Rep",
        "Arts Faculty Rep",
        "Engineering Faculty Rep",
      ],
      startDate: "2023-11-01",
      endDate: "2023-11-07",
      candidates: 12,
      voters: 1250,
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Current Elections
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Active and upcoming elections you can participate in
        </p>
      </header>

      <article className="space-y-6">
        {elections.map((election) => (
          <section
            key={election.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {election.title}
                  </h2>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    {election.description}
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  Active
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    Election Dates
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Start Date
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(election.startDate).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        End Date
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(election.endDate).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                    <UserGroupIcon className="h-4 w-4 mr-1" />
                    Participation
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Candidates
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {election.candidates}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Eligible Voters
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {election.voters}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Positions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {election.positions.map((position, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                    >
                      {position}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <ChartBarIcon className="h-5 w-5 text-gray-400 dark:text-gray-300 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Live results available after voting closes
                </span>
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                View Election
              </button>
            </div>
          </section>
        ))}
      </article>

      <article className="mt-8 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-lg p-6 border border-yellow-100 dark:border-yellow-800">
        <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">
          Important Notice
        </h3>
        <p className="text-yellow-700 dark:text-yellow-300">
          Voting is only available during the specified election dates. Make
          sure to cast your vote before the deadline to ensure your voice is
          heard in these important elections.
        </p>
      </article>
    </section>
  );
};

export default CurrentElections;
