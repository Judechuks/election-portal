import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  DownloadIcon,
  DocumentTextIcon,
  ChartBarIcon,
  TableIcon,
} from "@heroicons/react/outline";
import SecureCard from "../ui/SecureCard";

const ResultsExporter = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const [election, setElection] = useState(null);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [exportFormat, setExportFormat] = useState("pdf");
  const [includeDetails, setIncludeDetails] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Mock data
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockElection = {
          id: electionId,
          title: "Student Union President 2023",
          startDate: "2023-10-01T08:00:00Z",
          endDate: "2023-10-07T20:00:00Z",
          totalVoters: 1250,
          votesCast: 876,
          turnout: 70.08,
        };

        const mockResults = [
          {
            position: "President",
            candidates: [
              {
                name: "Alex Johnson",
                votes: 412,
                percentage: 47.03,
              },
              {
                name: "Samira Khan",
                votes: 328,
                percentage: 37.44,
              },
              {
                name: "Jamal Williams",
                votes: 136,
                percentage: 15.53,
              },
            ],
          },
          {
            position: "Treasurer",
            candidates: [
              {
                name: "Taylor Smith",
                votes: 512,
                percentage: 58.45,
              },
              {
                name: "Jordan Lee",
                votes: 364,
                percentage: 41.55,
              },
            ],
          },
        ];

        setElection(mockElection);
        setResults(mockResults);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [electionId]);

  const handleExport = () => {
    // In a real app, this would generate and download the file
    console.log(`Exporting results as ${exportFormat.toUpperCase()}`, {
      includeDetails,
      election,
      results,
    });
    alert(`Exported results as ${exportFormat.toUpperCase()}`);
    navigate(`/admin/elections/${electionId}`);
  };

  if (isLoading || !election) {
    return (
      <section className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto space-y-6">
      <article className="flex justify-between flex-wrap items-center gap-3">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-gray-900 dark:text-gray-300">
            Export Election Results
          </h1>
          <p className="text-gray-600 dark:text-gray-500">
            For: {election.title}
          </p>
        </div>
        <button
          onClick={() => navigate(`/admin/elections/${electionId}`)}
          className="ml-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-200"
        >
          Back to Election
        </button>
      </article>

      <SecureCard>
        <section className="p-6 space-y-8">
          <article className="border-b border-gray-200 pb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-300">
              Export Options
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Turnout: {election.turnout.toFixed(1)}% ({election.votesCast} of{" "}
              {election.totalVoters} votes cast)
            </p>
          </article>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article>
              <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-gray-400">
                Format
              </h3>
              <section className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="pdf"
                    name="format"
                    type="radio"
                    checked={exportFormat === "pdf"}
                    onChange={() => setExportFormat("pdf")}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 cursor-pointer"
                  />
                  <label
                    htmlFor="pdf"
                    className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    <div className="flex items-center dark:text-gray-400">
                      <DocumentTextIcon className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                      PDF Document
                    </div>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="csv"
                    name="format"
                    type="radio"
                    checked={exportFormat === "csv"}
                    onChange={() => setExportFormat("csv")}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 cursor-pointer"
                  />
                  <label
                    htmlFor="csv"
                    className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    <div className="flex items-center dark:text-gray-400">
                      <TableIcon className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                      CSV Spreadsheet
                    </div>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="excel"
                    name="format"
                    type="radio"
                    checked={exportFormat === "excel"}
                    onChange={() => setExportFormat("excel")}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 cursor-pointer"
                  />
                  <label
                    htmlFor="excel"
                    className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    <div className="flex items-center dark:text-gray-400">
                      <ChartBarIcon className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                      Excel Workbook
                    </div>
                  </label>
                </div>
              </section>
            </article>

            <article>
              <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-gray-400">
                Content
              </h3>
              <div className="space-y-4">
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="details"
                      name="details"
                      type="checkbox"
                      checked={includeDetails}
                      onChange={() => setIncludeDetails(!includeDetails)}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="details"
                      className="font-medium text-gray-700 dark:text-gray-400 cursor-pointer"
                    >
                      Include detailed results
                    </label>
                    <p className="text-gray-500">
                      Candidate breakdowns by position
                    </p>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="anonymous"
                      name="anonymous"
                      type="checkbox"
                      checked={true}
                      disabled
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="anonymous"
                      className="font-medium text-gray-700"
                    >
                      Protect voter anonymity
                    </label>
                    <p className="text-gray-500">Always enforced</p>
                  </div>
                </div>
              </div>
            </article>
          </section>

          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={handleExport}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <DownloadIcon className="-ml-1 mr-2 h-5 w-5" />
              Export Results
            </button>
          </div>
        </section>
      </SecureCard>

      {includeDetails && (
        <SecureCard>
          <section className="px-3 py-6 sm:p-6 space-y-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-300">
              Preview of Detailed Results
            </h2>
            <article className="overflow-auto border border-gray-200 rounded-lg custom-scrollbar">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200 dark:bg-gray-900">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Position
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Candidate
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Votes
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {results.map((result) => (
                    <>
                      <tr
                        key={result.position}
                        className="bg-gray-50 dark:bg-gray-700"
                      >
                        <td
                          colSpan="4"
                          className="px-6 py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {result.position}
                        </td>
                      </tr>
                      {result.candidates.map((candidate, idx) => (
                        <tr
                          key={idx}
                          className={
                            idx % 2 === 0
                              ? "bg-white dark:bg-transparent"
                              : "bg-gray-50 dark:bg-gray-700"
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"></td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                            {candidate.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {candidate.votes}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {candidate.percentage.toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </article>
          </section>
        </SecureCard>
      )}
    </section>
  );
};

export default ResultsExporter;
