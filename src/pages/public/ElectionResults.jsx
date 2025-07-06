import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import ErrorMsg from "../../components/message/ErrorMsg";
import { backendUrl } from "../../util";

const ElectionResults = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [election, setElection] = useState({});
  const [error, setError] = useState("");
  const { electionId } = useParams();

  // console.log(election);

  useEffect(() => {
    const fetchElection = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${backendUrl}/api/elections/${electionId}/results/`
        );

        // console.log("response", response);
        if (response.ok) {
          const result = await response.json();
          setElection(result);
        } else {
          setError(`Could not fetch result: ${response.status}`);
        }
      } catch (error) {
        console.error("Failed to fetch result:", error);
        setError(`Failed to fetch result: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchElection();
  }, [electionId]);

  if (isLoading) {
    return (
      <section className="max-w-7xl h-[calc(100vh-70px)] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </section>
    );
  }

  if (error) {
    return <ErrorMsg error={error} />;
  }

  // Colors for charts
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  // Calculate total votes per position
  const positionsWithTotals = election.positions?.map((position) => {
    const totalVotes = position.candidates.reduce(
      (sum, candidate) => sum + candidate.vote_count,
      0
    );
    return {
      ...position,
      totalVotes,
      candidates: position.candidates.map((candidate) => ({
        ...candidate,
        percentage: Math.round(
          (candidate.vote_count ? candidate.vote_count / totalVotes : 0) * 100
        ),
      })),
    };
  });

  // totalVotes for all positions
  const totalVotes = positionsWithTotals?.reduce(
    (sum, position) => sum + position.totalVotes,
    0
  );

  // Find the winning candidate for each position
  const winners = positionsWithTotals?.map((position) => {
    const winner = position.candidates.reduce((prev, current) =>
      prev.vote_count > current.vote_count ? prev : current
    );
    return {
      position: position.position_title,
      winner: winner.candidate_name,
      votes: winner.vote_count,
      percentage: winner.percentage,
    };
  });

  // Data for overall participation chart
  const participationData = positionsWithTotals?.map((position) => ({
    name: position.position_title,
    votes: position.totalVotes,
  }));

  return (
    <section className="min-h-screen py-8 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2 uppercase">
            {election.title} Results
          </h1>
          {/* <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Official election results certified by the Election Committee. All
            votes have been counted and verified.
          </p> */}
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Current election
          </p>
          <div className="w-32 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </header>

        {/* Summary Cards */}
        <article className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Total Positions
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {election.positions?.length}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700  rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Total Candidates
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {election.positions?.reduce(
                (sum, position) => sum + position.candidates.length,
                0
              )}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Total Votes Cast
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {totalVotes?.toLocaleString()}
            </p>
          </div>
        </article>

        {/* Winners Section */}
        <article className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Election Winners
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {winners?.map((winner, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {winner?.position}
                </h3>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100  mb-2">
                  {winner?.winner}
                </p>
                <div className="flex items-center justify-between">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {winner?.votes} votes
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {winner?.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Participation Chart */}
        <article className="bg-white dark:bg-gray-700 rounded-xl shadow-lg px-2 sm:px-6 py-6 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Voter Participation by Position
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={participationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="votes" name="Total Votes" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        {/* Detailed Results by Position */}
        <article className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Detailed Results
          </h2>

          {positionsWithTotals?.map((position) => (
            <div key={position.position_id} className="mb-12">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-4">
                {position.position_title} - {position.totalVotes} votes
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pie Chart */}
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={position.candidates}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="vote_count"
                        nameKey="candidate_name"
                        label={({ name, percentage }) =>
                          `${name}: ${percentage}%`
                        }
                      >
                        {position.candidates.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value} votes`, "Votes"]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Candidate Results Table */}
                <div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Candidate
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300  uppercase tracking-wider">
                            Votes
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300  uppercase tracking-wider">
                            Percentage
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-50 divide-y divide-gray-200">
                        {position.candidates.map((candidate, idx) => (
                          <tr
                            key={candidate.candidate_id}
                            className={
                              idx % 2 == 0 ? "" : "bg-gray-200 dark:bg-gray-500"
                            }
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                  <span className="text-indigo-800 font-semibold">
                                    {candidate.candidate_name.charAt(0)}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {candidate.candidate_name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {candidate.vote_count}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-900 mr-2">
                                  {candidate.percentage}%
                                </span>
                                <div className="w-32 bg-gray-200 rounded-full h-2.5">
                                  <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{
                                      width: `${candidate.percentage}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </article>

        {/* Final Certification */}
        {/* <article className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-4 md:mb-0 md:mr-6">
              <div className="bg-white rounded-full p-3 inline-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Results Certified</h2>
              <p className="max-w-2xl">
                The results of the {election.title} have been officially
                certified by the Election Committee and are considered final.
                These results were verified on {new Date().toLocaleDateString()}
                .
              </p>
            </div>
          </div>
        </article> */}
      </div>
    </section>
  );
};

export default ElectionResults;
