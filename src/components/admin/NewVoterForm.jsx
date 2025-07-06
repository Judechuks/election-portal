import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAddIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import SecureCard from "../ui/SecureCard";

const NewVoterForm = () => {
  const navigate = useNavigate();
  const [voter, setVoter] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    email: "",
    program: "undergraduate",
    year: "1",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVoter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save to the backend
    console.log("New voter:", voter);
    navigate("/admin/voters");
  };

  return (
    <section className="max-w-3xl mx-auto space-y-6">
      <article className="flex gap-3 items-center justify-between flex-wrap">
        <h1 className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
          <UserAddIcon className="h-6 w-6 inline-block mr-2" />
          Add New Voter
        </h1>
        <button
          onClick={() => navigate("/admin/voters")}
          className="ml-auto inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Voters
        </button>
        {/* <div className="w-24"></div> */} {/*Spacer for alignment */}
      </article>

      <SecureCard>
        <form onSubmit={handleSubmit} className="space-y-6 py-8 px-6">
          <article className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="studentId"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Student ID <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                required
                value={voter.studentId}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="S123456"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={voter.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="student@college.edu"
              />
            </div>

            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={voter.firstName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="John"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={voter.lastName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Doe"
              />
            </div>

            <div>
              <label
                htmlFor="program"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Program <span className="text-red-600">*</span>
              </label>
              <select
                id="program"
                name="program"
                value={voter.program}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="undergraduate">Undergraduate</option>
                <option value="graduate">Graduate</option>
                <option value="phd">PhD</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Year <span className="text-red-600">*</span>
              </label>
              <select
                id="year"
                name="year"
                value={voter.year}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="5+">5+ Year</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Status <span className="text-red-600">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={voter.status}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </article>

          <article className="pt-4 border-t border-gray-200 dark:border-gray-600 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <UserAddIcon className="-ml-1 mr-2 h-5 w-5" />
              Add Voter
            </button>
          </article>
        </form>
      </SecureCard>
    </section>
  );
};

export default NewVoterForm;
