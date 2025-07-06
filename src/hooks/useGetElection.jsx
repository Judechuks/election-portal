import { useState, useEffect } from "react";
import { getWithAuth } from "../util";

const useGetElection = (id) => {
  const [election, setElection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchElection = async () => {
      setIsLoading(true);
      try {
        const data = await getWithAuth(`/api/elections/${id}/`);
        console.log("Hey this is the data:", data);
        setElection(data);
      } catch (error) {
        console.error("Failed to fetch election:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchElection();
  }, [id]);

  return {
    election,
    isLoading,
    error,
  };
};

export default useGetElection;
