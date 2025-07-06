import {
  ClockIcon,
  UserCircleIcon,
  DocumentTextIcon,
  CogIcon,
} from "@heroicons/react/outline";

const AuditLogViewer = ({ logs }) => {
  // Mock data if none provided
  const displayedLogs = logs?.length
    ? logs
    : [
        {
          id: 1,
          action: "election_created",
          description: 'Created new election "Student Union President 2023"',
          timestamp: "2023-09-15T10:30:00Z",
          user: "admin@college.edu",
        },
        {
          id: 2,
          action: "voter_list_updated",
          description: "Updated eligible voters list (added 25 students)",
          timestamp: "2023-09-16T14:45:00Z",
          user: "admin@college.edu",
        },
        {
          id: 3,
          action: "election_started",
          description:
            'Started voting period for "Student Union President 2023"',
          timestamp: "2023-10-01T08:00:00Z",
          user: "admin@college.edu",
        },
      ];

  const getActionIcon = (action) => {
    switch (action.split("_")[0]) {
      case "election":
        return <DocumentTextIcon className="h-5 w-5 text-blue-500" />;
      case "voter":
        return <UserCircleIcon className="h-5 w-5 text-green-500" />;
      default:
        return <CogIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="overflow-hidden border border-gray-200 rounded-lg">
      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">
          System Activity Log
        </h3>
      </div>
      <ul className="overflow-auto custom-scrollbar divide-y divide-gray-200">
        {displayedLogs.map((log) => (
          <li
            key={log.id}
            className="min-w-lg w-full px-6 py-4 hover:bg-gray-50 hover:dark:bg-gray-900"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">{getActionIcon(log.action)}</div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-400">
                    {log.description}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="text-xs text-gray-500 dark:text-gray-300">
                      {new Date(log.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-300">
                  <UserCircleIcon className="flex-shrink-0 mr-1.5 h-4 w-4" />
                  <span className="truncate">{log.user}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {displayedLogs.length === 0 && (
        <div className="text-center py-8">
          <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No activity yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            System actions will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default AuditLogViewer;
