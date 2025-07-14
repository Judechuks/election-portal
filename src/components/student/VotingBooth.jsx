import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProgressIndicator from "../ui/ProgressIndicator";
import ErrorMsg from "../message/ErrorMsg";
import { backendUrl, getWithAuth } from "../../util";
import ElectionHeader from "./ElectionHeader";
import VotingForm from "./VotingForm";
import VoteSummary from "./VoteSummary";

const VotingBooth = () => {
  const { electionId } = useParams();
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [election, setElection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [electionError, setElectionError] = useState(null);

  useEffect(() => {
    const fetchElectionWithVoteStatus = async () => {
      try {
        setIsLoading(true);
        const data = await getWithAuth(
          `/api/elections/${electionId}/with-vote-status/`
        );
        setElection(data);
        // console.log("vote status:", data);
      } catch (err) {
        if (err.status === 403) {
          setElectionError("You are not eligible to vote for this election.");
        } else {
          setElectionError(err.message || "Failed to load election data");
        }
        console.error("Error fetching election with vote status:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchElectionWithVoteStatus();
  }, [electionId]);

  useEffect(() => {
    if (election && election.end_datetime) {
      const updateTimeLeft = () => {
        const now = new Date();
        const end = new Date(election.end_datetime);
        const diff = end - now;

        if (diff <= 0) {
          setTimeLeft("Election ended");
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        setTimeLeft(`${days}d ${hours}h ${minutes}m remaining`);
      };

      updateTimeLeft();
      const timer = setInterval(updateTimeLeft, 60000);
      return () => clearInterval(timer);
    }
  }, [election]);

  const handleSubmitVote = async (selectedCandidates) => {
    // setIsSubmitting(true);
    setError(null);

    try {
      const storedUser = JSON.parse(localStorage.getItem("nocen_user"));
      const accessToken = storedUser?.accessToken;
      if (!accessToken) {
        throw new Error("Access token not found. Please log in again.");
      }

      const votes = Object.entries(selectedCandidates).map(
        ([positionId, candidateId]) => ({
          election: electionId,
          position: positionId,
          candidate: candidateId,
        })
      );

      // Submit votes
      const responses = await Promise.all(
        votes.map((vote) =>
          fetch(`${backendUrl}/api/votes/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(vote),
          })
        )
      );

      // Handle responses
      const results = await Promise.all(
        responses.map(async (res) => {
          const contentType = res.headers.get("content-type");

          if (contentType && contentType.includes("application/json")) {
            const data = await res.json();
            return { status: res.status, ok: res.ok, data };
          } else {
            const text = await res.text();
            console.log(text);
            return {
              status: res.status,
              ok: res.ok,
              data: "Error Submitting Voting. Contact admin",
            };
          }
        })
      );

      // Check for errors
      const errors = results.filter((result) => !result.ok);
      if (errors.length > 0) {
        const errorMessages = errors.map(
          (err) =>
            // err.data?.detail || err.text || `HTTP error! Status: ${err.status}`
            err.data?.error || err.text || `HTTP error! Status: ${err.status}`
        );
        throw new Error(`Vote submission failed: ${errorMessages.join(", ")}`);
      }

      const hasErrors = errors.some((error) => error !== null);
      if (hasErrors) {
        const errorMessages = errors.filter((e) => e).join(", ");
        throw new Error(`Some votes failed: ${errorMessages}`);
      }

      // Refetch election data to update vote status
      const updatedElection = await getWithAuth(
        `/api/elections/${electionId}/with-vote-status/`
      );
      setElection(updatedElection);
    } catch (err) {
      setError(err.message || "An error occurred while submitting your vote");
    }
    // finally {
    //   setIsSubmitting(false);
    // }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 dark:bg-gray-800">
        <ProgressIndicator />
      </div>
    );
  }

  if (electionError || error) {
    return (
      <div className="flex justify-center items-center h-64">
        {electionError && <ErrorMsg error={electionError} />}
        {error && <ErrorMsg error={error} />}
      </div>
    );
  }

  const hasVoted = election.user_total_votes > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      <ElectionHeader
        election={election}
        timeLeft={timeLeft}
        hasVoted={hasVoted}
      />

      {hasVoted ? (
        <VoteSummary election={election} />
      ) : (
        <VotingForm
          election={election}
          onSubmit={handleSubmitVote}
          timeLeft={timeLeft}
          // isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default VotingBooth;
