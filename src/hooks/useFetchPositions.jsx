import { useState, useEffect } from "react";
import { backendUrl } from "../util";

const useFetchPositions = (electionId) => {
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPositions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${backendUrl}/api/elections/${electionId}/positions/`
        );

        if (response.ok) {
          const data = await response.json();
          setPositions(data);
          setIsLoading(false);
        } else {
          setError("Could not fetch positions. Please try again");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch positions:", error);
        setError("Could not fetch positions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPositions();
  }, [electionId]);

  return {
    positions,
    isLoading,
    error,
  };
};

export default useFetchPositions;
