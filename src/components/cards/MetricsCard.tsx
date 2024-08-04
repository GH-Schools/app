import { GenericObject } from "../../interfaces";
import { mergeClassNames } from "../../utils/utilities";

const MetricsCard = ({
  icon,
  title,
  style,
  message,
  bgColorClass,
}: {
  title: string;
  message: React.ReactNode;
  icon?: React.ReactNode;
  style?: GenericObject;
  bgColorClass?: string;
}) => {
  return (
    <div
      className="flex flex-row sm:flex-col justify-start sm:justify-initial items-center flex-none gap-6 sm:gap-4 flex-grow shadow-md px-5 py-5 rounded-xl sm:rounded-2xl bg-white sm:max--w-[32%] min-w-[250px]"
      style={{ ...style }}
    >
      <div
        className={mergeClassNames(
          "flex items-center justify-center p-1 rounded-full text-white w-[85px] h-[85px] flex-none font-bold shadow-sm",
          bgColorClass ?? "bg-yellow-600"
        )}
      >
        {icon}
      </div>

      <div className="flex flex-col gap-2 text-black items-start sm:items-center justify-center">
        <h3 className="font-bold text-xl">{title}</h3>
        <div className="flex text-xs font-medium text-gray-700 text-shadow-md">
          {message}
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;
