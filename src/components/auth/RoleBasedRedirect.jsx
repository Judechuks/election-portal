import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import ProgressIndicator from "../ui/ProgressIndicator";

const RoleBasedRedirect = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "admin":
          navigate("/admin");
          break;
        case "student":
          navigate("/student");
          break;
        default:
          navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="text-center space-y-4">
        <ProgressIndicator size="lg" />
        <h2 className="text-xl font-medium text-gray-700 dark:text-gray-200">
          Redirecting you to your portal
        </h2>
        <p className="text-gray-500 dark:text-gray-300">
          Please wait while we verify your credentials
        </p>
      </div>
    </div>
  );
};

export default RoleBasedRedirect;
