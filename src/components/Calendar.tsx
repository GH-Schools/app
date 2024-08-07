import React from "react";
import { mergeClassNames } from "../utils/utilities";
import {
  IoCaretBack as BackIcon,
  IoCaretForward as FrontIcon,
} from "react-icons/io5";

import Button from "../components/common/Button";
import { GenericObject } from "../interfaces";

export type CalendarEvent = {
  title: string;
  date: Date;
  color?: string;
  metadata?: GenericObject;
};

export type CalendarProps = {
  day: number;
  month: number;
  year: number;
  setPrev?: () => void;
  setNext?: () => void;
  events?: CalendarEvent[];
};

const Calendar = ({
  day,
  month,
  year,
  events = [],
  setPrev = () => {},
  setNext = () => {},
}: CalendarProps) => {
  const chosenDate = new Date(year, month, day);
  // console.log(year, month, day, chosenDate?.toString()?.split(" ")[1]);
  const data = generateDateRowsAndColumns(chosenDate.getMonth());

  const dateStyle = (data: any, currentDate: Date) => {
    const today = new Date();
    const defaultClass = "border cursor-pointer";

    switch (true) {
      case data === null:
        return mergeClassNames(defaultClass, "border-darkgray-600 bg-gray-300");

      case data &&
        data === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear():
        return mergeClassNames(
          defaultClass,
          "hover:border-0 hover:bg-green-600 hover:text-white border-green-500 text-green-600 font-bold"
        );

      default:
        return mergeClassNames(
          defaultClass,
          "hover:border-0 hover:bg-green-600 hover:text-white"
        );
    }
  };

  return (
    <div className="flex flex-col w-full gap-2.5 m-0.5 rounded-md overflow-hidden">
      <div className="flex flex-row justify-center text-black items-center rounded-md w-full p-1 gap-3 bg--[#21B591] bg-gray-200">
        <Button
          text={<BackIcon />}
          onClick={setPrev}
          className="text-center font-bold w-[35px] h-[35px] rounded-full"
          style={{
            backgroundColor: "transparent",
            textTransform: "capitalize",
            color: "inherit",
            // color: "#21B591",
            fontSize: "12px",
            fontWeight: 700,
            padding: "5px",
          }}
        />
        <span className="text-sm font-semibold text-inherit">{`${
          chosenDate?.toString()?.split(" ")?.[1]
        } ${year}`}</span>
        <Button
          text={<FrontIcon />}
          onClick={setNext}
          className="text-center font-bold w-[35px] h-[35px] rounded-full"
          style={{
            backgroundColor: "transparent",
            textTransform: "capitalize",
            // color: "#21B591",
            color: "inherit",
            fontSize: "12px",
            fontWeight: 700,
            padding: "5px",
          }}
        />
      </div>
      <div className="flex flex-row w-full gap-0.5">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
          (dateCol, columnIndex) => (
            <div className="flex flex-col flex-grow gap-0.5">
              <div className="border p-2 font-bold rounded-md">{dateCol}</div>
              {data.map((_, rowIndex) => {
                const d = data[rowIndex][columnIndex];
                const eventsForD = events.filter(
                  (ev) =>
                    ev.date.getDate() === Number(d) &&
                    ev.date.getMonth() === chosenDate.getMonth() &&
                    ev.date.getFullYear() === chosenDate.getFullYear()
                );
                return (
                  <button
                    className={mergeClassNames(
                      "ignore-default-styles flex flex-col justify-between text-left p-2 min-h-[65px] flex-grow text-sm rounded-md",
                      dateStyle(d, chosenDate)
                    )}
                    disabled={d === null}
                  >
                    <span>{d}</span>
                    {eventsForD && eventsForD.length > 0 && (
                      <div className="flex flex-row w-[90%] gap-0.5">
                        {eventsForD.map((ev) => (
                          <div
                            className={`flex flex-row w-1/${Math.max(
                              2,
                              eventsForD.length
                            )} h-[3px] border-[3px] border-yellow-500 rounded-md`}
                            style={{ borderColor: ev.color ?? "orange" }}
                          ></div>
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
};

const generateDateRowsAndColumns = (month: number) => {
  type Row = number | null;
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), month, 1);
  const lastDay = new Date(today.getFullYear(), month + 1, 0);
  const initialPad = firstDay.getDay();
  const rowsAndCols: Row[][] = [[]];

  if (initialPad > 0) {
    rowsAndCols[0] = new Array(initialPad).fill(null) as Row[];
  }

  let rowCount = 0;

  for (let i = 1; i < lastDay.getDate(); i++) {
    if (rowsAndCols[rowCount].length < 7) {
      rowsAndCols[rowCount].push(i);
    } else {
      rowCount += 1;
      rowsAndCols[rowCount] = [i];
    }
  }

  const finalPad = 7 - rowsAndCols[rowCount].length;
  rowsAndCols[rowCount] = rowsAndCols[rowCount].concat(
    new Array(finalPad).fill(null)
  );

  return rowsAndCols;
};

export default Calendar;
