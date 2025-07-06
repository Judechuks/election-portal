import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  SearchIcon,
  XIcon,
  CheckIcon,
  UserAddIcon,
} from "@heroicons/react/outline";
import SecureCard from "../ui/SecureCard";

const VoterEligibility = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [eligibleVoters, setEligibleVoters] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Mock data
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockAllStudents = Array.from({ length: 50 }, (_, i) => ({
          id: `S${10000 + i}`,
          name: `Student ${i + 1}`,
          email: `student${i + 1}@college.edu`,
          program: i % 2 === 0 ? "Undergraduate" : "Graduate",
          year: (i % 4) + 1,
        }));

        const mockEligibleVoters = mockAllStudents
          .filter((_, i) => i % 2 === 0)
          .map((student) => student.id);

        setAllStudents(mockAllStudents);
        setEligibleVoters(mockEligibleVoters);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [electionId]);

  const toggleVoterEligibility = (studentId) => {
    setEligibleVoters((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const filteredStudents = allStudents.filter(
    (student) =>
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log("Updated eligible voters:", eligibleVoters);
    navigate(`/admin/elections/${electionId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto space-y-6">
      <article className="flex justify-between items-start gap-3 flex-wrap">
        <aside>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            Manage Voter Eligibility
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            For election ID: {electionId}
          </p>
        </aside>
        <aside className="flex space-x-3 ml-auto">
          <button
            onClick={() => navigate(`/admin/elections/${electionId}`)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Save Changes
          </button>
        </aside>
      </article>

      <SecureCard>
        <section className="p-6 space-y-6">
          <article className="border-b border-gray-200 pb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-300">
              Eligible Voters
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {eligibleVoters.length} of {allStudents.length} students currently
              eligible to vote
            </p>
          </article>

          <article className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search students by name, ID, or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 sm:text-md border border-gray-300 rounded-md leading-5 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </article>

          <article className="overflow-auto custom-scrollbar border border-gray-200 dark:border-gray-600 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              <thead className="bg-gray-50 dark:bg-gray-700">
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
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Eligible
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-600">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {student.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {student.program} (Year {student.year})
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => toggleVoterEligibility(student.id)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          eligibleVoters.includes(student.id)
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                        }`}
                      >
                        {eligibleVoters.includes(student.id) ? (
                          <>
                            <CheckIcon className="h-3 w-3 mr-1" />
                            Eligible
                          </>
                        ) : (
                          <>
                            <XIcon className="h-3 w-3 mr-1" />
                            Not Eligible
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <UserAddIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No students found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try a different search term
              </p>
            </div>
          )}
        </section>
      </SecureCard>
    </section>
  );
};

export default VoterEligibility;
