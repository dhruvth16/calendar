"use client";

import Image from "next/image";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Notes from "./Notes";

function Calendar() {
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showNotes, setShowNotes] = useState(false);

  const handleDayClick = (date: Date) => {
    setSelected(date);

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (date < startDate) {
      setEndDate(startDate);
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const selectedDateRange =
    startDate && endDate ? { startDate, endDate } : null;

  const isInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date > startDate && date < endDate;
  };

  const isStart = (date: Date) =>
    !!(startDate && date.toDateString() === startDate.toDateString());

  const isEnd = (date: Date) =>
    !!(endDate && date.toDateString() === endDate.toDateString());

  return (
    <div>
      <main className="h-150 swing w-sm bg-[#FFF6F6] shadow-2xl relative shadow-gray-300 border-[0.5px] border-gray-200 rounded-b-xl overflow-y-scroll overflow-x-hidden no-scrollbar">
        <div className="h-70 w-full border-b-[0.4px] border-gray-200 relative">
          <h3 className="text-2xl font-semibold text-center py-4 absolute z-20 bottom-0 right-2 flex flex-col items-end gap-1">
            <span>
              {selected
                ? selected.toLocaleDateString("en-US", {
                    year: "numeric",
                  })
                : "No date selected"}
            </span>
            <span>
              {selected
                ? selected.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                  })
                : "No date selected"}
            </span>
          </h3>
          <h3
            onClick={() => setShowNotes(true)}
            className="text-2xl font-semibold text-center p-1 rounded-xl absolute z-20 bottom-2 cursor-pointer hover:bg-orange-200 transition-all left-2 border-[0.3px] border-orange-200 flex flex-col items-end gap-1"
          >
            <span className="text-xs transition-all duration-300">
              Click to add a note +
            </span>
          </h3>
          <div className="h-120 w-full -top-67 rounded-tl-xl rounded-xl -rotate-33 flex items-center justify-center relative overflow-hidden">
            <Image
              src="/calendar.jpg"
              alt="Calendar"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="flex items-center gap-1 justify-center w-full p-2">
          <DayPicker
            mode="single"
            selected={selected}
            onDayClick={handleDayClick}
            className="custom-calendar"
            modifiers={{
              start: isStart,
              end: isEnd,
              range: isInRange,
            }}
            modifiersClassNames={{
              start: "bg-blue-600 text-white rounded-l-full",
              end: "bg-blue-600 text-white rounded-r-full",
              range: "bg-blue-200 text-black",
              today: "border border-blue-400",
            }}
          />
        </div>
      </main>

      {showNotes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-[95%] max-w-md animate-in fade-in zoom-in-95">
            <Notes
              selected={selected}
              selectedDateRange={selectedDateRange}
              setShowNotes={setShowNotes}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
