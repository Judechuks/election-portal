const SecureCard = ({ children, className = "" }) => {
  return (
    <div
      className={`relative rounded-lg border border-gray-200 bg-white dark:bg-transparent shadow-sm overflow-hidden ${className}`}
    >
      <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
        SECURE
      </div>
      {children}
    </div>
  );
};

export default SecureCard;
