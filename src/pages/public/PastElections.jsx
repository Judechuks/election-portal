import { ArchiveIcon, UsersIcon } from "@heroicons/react/outline";
import { LiaTrophySolid } from "react-icons/lia";

const PastElections = () => {
  const elections = [
    {
      id: 1,
      title: "Student Union President 2022",
      date: "2022-10-01 to 2022-10-07",
      winner: "Jamal Williams",
      winnerPhoto: "https://randomuser.me/api/portraits/men/75.jpg",
      totalVotes: 1200,
      votesCast: 950,
      turnout: "79.2%",
    },
    {
      id: 2,
      title: "Faculty Representatives 2021",
      date: "2021-11-01 to 2021-11-07",
      winner: "Multiple Winners",
      totalVotes: 1150,
      votesCast: 805,
      turnout: "70%",
    },
    {
      id: 3,
      title: "Student Union President 2021",
      date: "2021-10-01 to 2021-10-07",
      winner: "Maria Garcia",
      winnerPhoto: "https://randomuser.me/api/portraits/women/65.jpg",
      totalVotes: 1150,
      votesCast: 805,
      turnout: "70%",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Past Elections
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Historical results from previous student union elections
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
                    {election.date}
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  Completed
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                    <LiaTrophySolid className="h-4 w-4 mr-1" />
                    Election Winner
                  </h3>
                  {election.winnerPhoto ? (
                    <div className="flex items-center">
                      <img
                        src={election.winnerPhoto}
                        alt={`${election.winner}'s profile`}
                        className="h-12 w-12 rounded-full object-cover mr-3"
                        aria-label={`Profile photo of ${election.winner}`}
                      />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {election.winner}
                      </span>
                    </div>
                  ) : (
                    <p className="font-medium text-gray-900 dark:text-white">
                      {election.winner}
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                    <UsersIcon className="h-4 w-4 mr-1" />
                    Voter Participation
                  </h3>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Total Votes:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {election.votesCast} of {election.totalVotes}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Turnout:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {election.turnout}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <ArchiveIcon className="-ml-1 mr-2 h-5 w-5" />
                View Full Results
              </button>
            </div>
          </section>
        ))}
      </article>

      <article className="mt-8 bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
          Election Archives
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          For results from elections prior to 2021, please contact the Student
          Union office or visit the campus library's digital archives.
        </p>
      </article>
    </section>
  );
};

export default PastElections;
