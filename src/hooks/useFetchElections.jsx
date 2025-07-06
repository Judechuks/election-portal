import { useState, useEffect } from "react";
import { backendUrl } from "../util";

const useFetchElections = () => {
  const [elections, setElections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchElections = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${backendUrl}/api/elections/`);

        if (response.ok) {
          const data = await response.json();
          setElections(data);
          setIsLoading(false);
        } else {
          setError("Could not fetch election. Please try again");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch elections:", error);
        setError("Could not fetch election");
      } finally {
        setIsLoading(false);
      }
    };

    fetchElections();
  }, []);

  return {
    elections,
    isLoading,
    error,
  };
};

export default useFetchElections;
