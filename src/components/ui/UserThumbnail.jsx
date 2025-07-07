const UserThumbnail = ({ className }) => {
  return (
    <article
      className={`bg-gray-200 border-2 border-dashed rounded-full w-32 h-32 mb-4 flex items-center justify-center text-gray-400 ${className}`}
    >
      <svg
        className="h-16 w-16"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    </article>
  );
};

export default UserThumbnail;
