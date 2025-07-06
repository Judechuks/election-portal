import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { FaSignal } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { PiOfficeChairBold } from "react-icons/pi";
import { BiNoSignal } from "react-icons/bi";
import { HiMiniArrowPath } from "react-icons/hi2";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { webSocketUrl } from "../../util";

ChartJS.register(ArcElement, Tooltip, Legend);

const LiveResults = () => {
  const { electionId } = useParams();
  const [results, setResults] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [totalVoters, setTotalVoters] = useState(0);
  const [votesCast, setVotesCast] = useState(0);
  const [positions, setPositions] = useState(0);
  const [error, setError] = useState(null);

  const socketRef = useRef(null);
  const reconnectIntervalRef = useRef(1000); // Initial reconnect interval (1s)
  const pingIntervalRef = useRef(null);
  const lastPongRef = useRef(Date.now());

  // Function to generate random colors for chart
  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = Math.floor(Math.random() * 360);
      colors.push(`hsl(${hue}, 70%, 60%)`);
    }
    return colors;
  };

  // Setup WebSocket handlers (memoized with useCallback)
  const setupWebSocketHandlers = useCallback((socket) => {
    socket.onmessage = (event) => {
      try {
        // Handle ping/pong
        if (event.data === "pong") {
          lastPongRef.current = Date.now();
          return;
        }

        const data = JSON.parse(event.data);
        setResults(data);

        let votesCast = 0;
        let positionsWithResults = 0;
        let estimatedVoters = 0;

        data.positions.forEach((position) => {
          const positionVotes = position.candidates.reduce(
            (sum, candidate) => sum + candidate.vote_count,
            0
          );
          votesCast += positionVotes;
          if (positionVotes > 0) positionsWithResults++;
          if (positionVotes > estimatedVoters) {
            estimatedVoters = positionVotes;
          }
        });

        setTotalVoters(estimatedVoters);
        setPositions(positionsWithResults);
        setVotesCast(votesCast);
        setLastUpdated(new Date());
        setError(null);
      } catch (parseError) {
        console.error("Error parsing WebSocket message:", parseError);
        setError("Failed to parse live results data");
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionStatus("error");
      setError("WebSocket connection error");
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(
          `WebSocket closed cleanly, code=${event.code}, reason=${event.reason}`
        );
      } else {
        console.error("WebSocket connection abruptly closed");
      }
      setConnectionStatus("disconnected");
    };
  }, []); // Empty dependency array ensures stable reference

  // Connect to WebSocket
  useEffect(() => {
    const connect = () => {
      try {
        socketRef.current = new WebSocket(
          `${webSocketUrl}/ws/public/elections/${electionId}/live-results/`
        );

        socketRef.current.onopen = () => {
          setConnectionStatus("connected");
          console.log("WebSocket connection established");
          reconnectIntervalRef.current = 1000; // Reset reconnect interval

          // Start ping interval
          if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
          pingIntervalRef.current = setInterval(() => {
            if (socketRef.current?.readyState === WebSocket.OPEN) {
              // Check if last pong was recent
              if (Date.now() - lastPongRef.current > 30000) {
                console.error("No pong received, reconnecting...");
                socketRef.current.close();
                return;
              }
              socketRef.current.send("ping");
            }
          }, 15000); // Ping every 15 seconds
        };

        setupWebSocketHandlers(socketRef.current);
      } catch (err) {
        console.error("Error setting up WebSocket:", err);
        setConnectionStatus("error");
        setError("Failed to establish WebSocket connection");
      }
    };

    connect();

    // Cleanup function
    return () => {
      if (socketRef.current) {
        if (socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.close();
        }
      }
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }
    };
  }, [electionId, setupWebSocketHandlers]);

  // Reconnect with exponential backoff
  useEffect(() => {
    let reconnectTimer;

    const connectForReconnection = () => {
      try {
        socketRef.current = new WebSocket(
          `${webSocketUrl}/ws/public/elections/${electionId}/live-results/`
        );

        socketRef.current.onopen = () => {
          setConnectionStatus("connected");
          console.log("Reconnected to WebSocket");
          reconnectIntervalRef.current = 1000; // Reset reconnect interval

          // Start ping interval
          if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
          pingIntervalRef.current = setInterval(() => {
            if (socketRef.current?.readyState === WebSocket.OPEN) {
              // Check if last pong was recent
              if (Date.now() - lastPongRef.current > 30000) {
                console.error("No pong received, reconnecting...");
                socketRef.current.close();
                return;
              }
              socketRef.current.send("ping");
            }
          }, 15000); // Ping every 15 seconds
        };

        setupWebSocketHandlers(socketRef.current);
      } catch (err) {
        console.error("Reconnection error:", err);
        setConnectionStatus("error");
      }
    };

    if (connectionStatus === "disconnected" || connectionStatus === "error") {
      reconnectTimer = setTimeout(() => {
        setConnectionStatus("connecting");

        // Close existing socket if any
        if (socketRef.current) {
          if (socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.close();
          }
        }

        // Increase reconnect interval with exponential backoff (max 30s)
        reconnectIntervalRef.current = Math.min(
          reconnectIntervalRef.current * 2,
          30000
        );

        connectForReconnection();
      }, reconnectIntervalRef.current);
    }

    return () => {
      if (reconnectTimer) clearTimeout(reconnectTimer);
    };
  }, [connectionStatus, electionId, setupWebSocketHandlers]);

  // Render connection status indicator
  const renderConnectionStatus = () => {
    let statusClass = "";
    let statusIcon = null;

    switch (connectionStatus) {
      case "connecting":
        statusClass = "bg-yellow-100 text-yellow-800";
        statusIcon = <HiMiniArrowPath className="h-4 w-4 mr-1 animate-spin" />;
        break;
      case "connected":
        statusClass = "bg-green-100 text-green-800";
        statusIcon = <FaSignal className="h-4 w-4 mr-1" />;
        break;
      case "disconnected":
      case "error":
        statusClass = "bg-red-100 text-red-800";
        statusIcon = <BiNoSignal className="h-4 w-4 mr-1" />;
        break;
      default:
        statusClass = "bg-gray-100 text-gray-800";
    }

    return (
      <div
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}
      >
        {statusIcon}
        {connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
      </div>
    );
  };

  // Format last updated time with stale detection
  const formatLastUpdated = () => {
    if (!lastUpdated) return "Never updated";

    const now = new Date();
    const diffSeconds = Math.floor((now - lastUpdated) / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);

    if (diffSeconds < 60) {
      return `${diffSeconds} seconds ago`;
    }

    let text = `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;

    // Highlight if data is stale (more than 2 minutes old)
    if (diffMinutes > 2) {
      return (
        <span className="text-yellow-600 dark:text-yellow-400">
          {text} - Data might be stale
        </span>
      );
    }

    return text;
  };

  // Prepare chart data
  const prepareChartData = () => {
    if (!results || !results.positions) return null;

    return results.positions.map((position) => {
      const candidateNames = position.candidates.map((c) => c.candidate_name);
      const candidateVotes = position.candidates.map((c) => c.vote_count);
      const backgroundColors = generateColors(position.candidates.length);

      return {
        position: position.position_title,
        chartData: {
          labels: candidateNames,
          datasets: [
            {
              data: candidateVotes,
              backgroundColor: backgroundColors,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.label || "";
                  const value = context.raw || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage =
                    total > 0 ? Math.round((value / total) * 100) : 0;
                  return `${label}: ${value} votes (${percentage}%)`;
                },
              },
            },
          },
        },
      };
    });
  };

  const chartData = prepareChartData();

  return (
    <div className="">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-around p-6 mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {results?.election_title || "Live Election Results"}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {renderConnectionStatus()}
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {lastUpdated
                ? `Updated: ${formatLastUpdated()}`
                : "Awaiting data..."}
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 dark:bg-red-900/30 dark:border-red-700">
            <div className="flex">
              <div className="flex-shrink-0">
                <BiNoSignal className="h-5 w-5 text-red-500 dark:text-red-300" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 dark:text-red-300">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <article className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6 border border-blue-100 dark:border-blue-800/50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Total Voters
              </h3>
              <aside className="bg-blue-100 dark:bg-blue-800/50 rounded-lg p-2">
                <FaUsers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </aside>
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-700 dark:text-white">
              {totalVoters.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              voters who voted
            </p>
          </article>

          <article className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6 border border-green-100 dark:border-green-800/50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Votes Cast
              </h3>
              <aside className="bg-green-100 dark:bg-green-800/50 rounded-lg p-2">
                <HiOutlineCheckBadge className="h-6 w-6 text-green-600 dark:text-green-400" />
              </aside>
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-700 dark:text-white">
              {votesCast.toLocaleString()}
            </p>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total votes cast
              </p>
            </div>
          </article>

          <article className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/30 dark:to-violet-900/30 rounded-xl p-6 border border-purple-100 dark:border-purple-800/50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Positions with Vote
              </h3>
              <aside className="bg-purple-100 dark:bg-purple-800/50 rounded-lg p-2">
                <PiOfficeChairBold className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </aside>
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-700 dark:text-white">
              {positions}
            </p>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Positions voted for
              </p>
            </div>
          </article>
        </div>
      </div>

      {chartData && chartData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chartData.map((positionData, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-around p-3 sm:p-4 md:p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {positionData.position}
              </h2>
              <div className="h-64 flex items-center justify-center">
                <Doughnut
                  data={positionData.chartData}
                  options={positionData.options}
                />
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Candidate
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Votes
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {positionData.chartData.labels.map((label, idx) => {
                      const votes =
                        positionData.chartData.datasets[0].data[idx];
                      const total =
                        positionData.chartData.datasets[0].data.reduce(
                          (a, b) => a + b,
                          0
                        );
                      const percentage =
                        total > 0 ? Math.round((votes / total) * 100) : 0;

                      return (
                        <tr key={idx}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {label}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">
                            {votes}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-right">
                            {percentage}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
          <div className="flex justify-center mb-4">
            <HiMiniArrowPath className="h-12 w-12 text-gray-400 dark:text-gray-500 animate-spin" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Loading election results
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {connectionStatus === "connected"
              ? "Processing incoming data..."
              : "Establishing connection..."}
          </p>
        </div>
      )}
    </div>
  );
};

export default LiveResults;
