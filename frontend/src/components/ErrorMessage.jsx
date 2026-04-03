const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-3">
      {message}
    </div>
  );
};

export default ErrorMessage;