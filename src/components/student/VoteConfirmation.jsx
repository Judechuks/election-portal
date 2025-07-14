import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/outline";

const VoteConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/student");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto bgwhite rounded-xl shadow-md overflow-hidden p-8 text-center">
      <div className="bg-green50 rounded-full p-3 inline-flex items-center justify-center mb-6">
        <CheckCircleIcon className="h-12 w-12 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
        Your vote has been recorded!
      </h2>
      <p className="text-gray-700 dark:text-gray-400 mb-6">
        Thank you for participating in the student election.
      </p>
      <div className="text-sm text-gray-600 dark:text-gray-500">
        <p>You will be redirected to your dashboard shortly.</p>
        <p className="mt-2">
          Remember, your vote is anonymous and cannot be changed.
        </p>
      </div>
    </div>
  );
};

export default VoteConfirmation;
