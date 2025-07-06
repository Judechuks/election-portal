import {
  ChartBarIcon,
  TrendingUpIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";

const Statistics = () => {
  // Mock data for charts - in a real app, this would come from an API
  const electionStats = {
    participation: {
      labels: ["2018", "2019", "2020", "2021", "2022"],
      data: [65, 68, 72, 70, 79],
    },
    positions: [
      { name: "President", candidates: 4, votes: 950 },
      { name: "Vice President", candidates: 3, votes: 920 },
      { name: "Treasurer", candidates: 2, votes: 890 },
      { name: "Secretary", candidates: 3, votes: 880 },
    ],
    demographics: {
      byProgram: [
        { name: "Arts", value: 28 },
        { name: "Science", value: 35 },
        { name: "Engineering", value: 22 },
        { name: "Business", value: 15 },
      ],
      byYear: [
        { name: "First Year", value: 25 },
        { name: "Second Year", value: 30 },
        { name: "Third Year", value: 28 },
        { name: "Fourth Year+", value: 17 },
      ],
    },
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Election Statistics
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Historical data and trends from student union elections
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-6 mb-8">
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <TrendingUpIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
            Voter Participation Trends
          </h2>
          <div className="h-64 flex items-end space-x-2">
            {electionStats.participation.data.map((value, index) => (
              <div
                key={index}
                className="h-full flex flex-col items-center justify-end flex-1"
              >
                <div
                  className="w-full bg-indigo-100 dark:bg-indigo-900 rounded-t-sm"
                  style={{ height: `${value}%` }}
                  aria-label={`${value}% participation in ${electionStats.participation.labels[index]}`}
                ></div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {electionStats.participation.labels[index]}
                </span>
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  {value}%
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <UserGroupIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
            Voter Demographics (2022)
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                By Program
              </h3>
              <ul className="space-y-2">
                {electionStats.demographics.byProgram.map((item, index) => (
                  <li key={index}>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">
                        {item.name}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {item.value}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                      <div
                        className="bg-indigo-600 dark:bg-indigo-400 h-1.5 rounded-full"
                        style={{ width: `${item.value}%` }}
                        aria-hidden="true"
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                By Year
              </h3>
              <ul className="space-y-2">
                {electionStats.demographics.byYear.map((item, index) => (
                  <li key={index}>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">
                        {item.name}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {item.value}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                      <div
                        className="bg-indigo-600 dark:bg-indigo-400 h-1.5 rounded-full"
                        style={{ width: `${item.value}%` }}
                        aria-hidden="true"
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
          <ChartBarIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
          Position Statistics (2022 Election)
        </h2>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Position
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Candidates
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Votes Cast
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Winner's Vote %
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {electionStats.positions.map((position, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {position.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {position.candidates}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {position.votes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {Math.round((position.votes / 950) * 100)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <article className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg p-6 border border-blue-100 dark:border-blue-800">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">
          Data Transparency
        </h3>
        <p className="text-blue-700 dark:text-blue-300">
          These statistics are compiled from official election records. For more
          detailed data or specific queries, please contact the Election
          Committee. All data is anonymized to protect voter privacy.
        </p>
      </article>
    </section>
  );
};

export default Statistics;
