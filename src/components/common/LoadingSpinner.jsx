const LoadingSpinner = (props) => {
  const { color = "border-white" } = props;

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full h-10 w-10 border-t-3 border-b-2 ${color}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
