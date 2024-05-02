const LoadingSpinner = (props) => {
  const { color = "border-white" } = props;

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 ${color}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
