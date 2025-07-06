import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchIcon, FilterIcon, UserAddIcon } from "@heroicons/react/outline";
import SecureCard from "../ui/SecureCard";

const VoterManager = () => {
  const [voters, setVoters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchVoters = async () => {
      setIsLoading(true);
      try {
        // Mock data
        await new Promise((resolve) => setTimeout(resolve, 800));
        const mockVoters = Array.from({ length: 50 }, (_, i) => ({
          id: `S${10000 + i}`,
          name: `Student ${i + 1}`,
          email: `student${i + 1}@college.edu`,
          program: i % 2 === 0 ? "Undergraduate" : "Graduate",
          year: (i % 4) + 1,
          status: i % 3 === 0 ? "active" : i % 3 === 1 ? "inactive" : "pending",
        }));
        setVoters(mockVoters);
      } catch (error) {
        console.error("Failed to fetch voters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVoters();
  }, []);

  const filteredVoters = voters.filter(
    (voter) =>
      voter.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voter.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="space-y-6">
      <article className="flex justify-between items-start flex-wrap gap-x-2 gap-y-3">
        <aside>
          <h1 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-300">
            Voter Management
          </h1>
          <p className="text-md text-gray-500">
            Add voter to vote for elections.
          </p>
        </aside>
        <Link
          to="/admin/voters/new"
          className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <UserAddIcon className="-ml-1 mr-2 h-5 w-5" />
          Add Voter
        </Link>
      </article>

      <SecureCard>
        <section className="p-6 space-y-6">
          <article className="my-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow">
              <aside className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </aside>
              <input
                type="text"
                placeholder="Search voters by name, ID, or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 dark:text-gray-400 border border-gray-300 rounded-md leading-5 bg-white dark:bg-transparent placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50 dark:bg-transparent focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <FilterIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
              Filters
            </button>
          </article>

          {isLoading ? (
            <section className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </section>
          ) : (
            <div className="overflow-x-auto custom-scrollbar">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Student ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Program
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="relative px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      <span className="sronly">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredVoters.map((voter) => (
                    <tr key={voter.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                        {voter.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {voter.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {voter.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {voter.program} (Year {voter.year})
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            voter.status === "active"
                              ? "bg-green-100 text-green-800"
                              : voter.status === "inactive"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {voter.status.charAt(0).toUpperCase() +
                            voter.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/admin/voters/${voter.id}`}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </Link>
                        <button className="text-red-600 hover:text-red-900">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </SecureCard>
    </section>
  );
};

export default VoterManager;
