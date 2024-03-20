import LoadingSpinner from "./common/LoadingSpinner";

const SuspenseFallback = () => {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <LoadingSpinner color="border-green-700" />
    </div>
  );
};

export default SuspenseFallback;
