import { RiMapPinTimeLine as MapIcon } from "react-icons/ri";
import { AiOutlineClockCircle as ClockIcon } from "react-icons/ai";
import { GenericObject } from "../../../interfaces";
import { useState } from "react";
import moment from "moment";
import Button from "../../../components/common/Button";

export const EventView = ({ data }: { data: GenericObject }) => {
  console.log(data);
  const [showEndDate, setShowEndDate] = useState(false);
  return (
    <div className="flex flex-col w-full gap-2.5 pb-3 w-[95%] sm:w-[40vw] min-w-[300px] px-3">
      <div className="flex flex-row justify-between items-center w-full">
        <input
          type="text"
          className="text-2xl font-medium w-full"
          placeholder="Event Title"
          value={data?.title ?? ""}
        />
        <Button
          text={"Save"}
          // href={`/admin/dashboard/schedules/create`}
          className="text-center font-bold bg-green-600"
          style={{
            color: "#21B591",
            fontSize: "12px",
            fontWeight: 700,
            padding: "10px",
            borderRadius: "5px",
            textTransform: "capitalize",
          }}
        />
      </div>

      <div className="border"></div>

      <div className="flex flex-col justify-center items-start gap-1">
        <div className="flex flex-row justify-between items-center w-full">
          <span className="font-medium">Event Type</span>
          <span className="rounded-full bg-purple-400 p-1 w-[20px] h-[20px]"></span>
        </div>

        <select
          value={data?.eventType ?? data?.metadata?.eventType ?? "--"}
          className="inline-block text-sm lowercase w-full -ml-1"
        >
          <option value={" "}>
            <em>Choose type</em>
          </option>
          <option value={"INTERVIEW"}>Interview</option>
          <option value={"LECTURE"}>Lecture</option>
          <option value={"ORIENTATION"}>Orientation</option>
          <option value={"CUSTOM"}>Custom</option>
        </select>
      </div>

      <div className="border"></div>

      <select className="text-sm w-full -ml-1">
        <option value={" "}>
          <em>Choose timezone</em>
        </option>
        <option value={"WAT"} selected={true}>
          West Africa Standard Time
        </option>
      </select>
      <input
        type="datetime-local"
        className="text-sm"
        value={moment(
          new Date(data?.dueDate ?? data?.metadata?.dueDate)
        ).format("YYYY-MM-DDTHH:mm")}
      />
      {showEndDate && <input type="datetime-local" className="text-sm" />}
      <div className="flex flex-row justify-between items-center gap-2">
        <div className="flex flex-row-reverse justify-between items-center gap-2">
          <span className="text-sm capitalize">Include End Date?</span>
          <input
            type="checkbox"
            checked={showEndDate}
            className="text-sm"
            onChange={(ev) => {
              setShowEndDate(ev.target.checked);
            }}
          />
        </div>

        <div className="flex flex-row-reverse justify-between items-center gap-2">
          <ClockIcon />
        </div>
      </div>

      <div className="border"></div>

      <div className="flex flex-row justify-between items-center gap-2">
        <input
          type="url"
          className="text-sm w-full"
          placeholder="Add Location"
        />
        <MapIcon />
      </div>

      <div className="border"></div>

      <textarea
        className="text-sm w-full"
        placeholder="Add description"
      ></textarea>
    </div>
  );
};
