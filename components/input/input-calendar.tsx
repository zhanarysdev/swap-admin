"use client";
import { useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export function InputCalendar({ placeholder, value, onChange }) {
  const selectRef = useRef<HTMLDivElement>(null); // Ref to detect outside clicks

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        onChange(null); // Close dropdown if clicked outside
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onChange]);

  const handleDateChange = (date: Date | null) => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      onChange(date);
    } else {
      onChange(null);
    }
  };

  return (
    <div className="relative" ref={selectRef}>
      <style jsx global>{`
        .react-calendar {
          background: #333333 !important;
          color: white !important;
        }
        .react-calendar__tile {
          color: white !important;
        }
        .react-calendar__tile--active {
          background: #BEFF1B !important;
          color: #212121 !important;
        }
        .react-calendar__tile--now {
          background: #383838 !important;
        }
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background: #383838 !important;
        }
        .react-calendar__navigation button {
          color: white !important;
        }
        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
          background: #383838 !important;
        }
        .react-calendar__month-view__weekdays {
          color: white !important;
        }
      `}</style>
      <Calendar
        onChange={handleDateChange}
        value={value instanceof Date && !isNaN(value.getTime()) ? value : null}
        locale="Ru-ru"
        className="bg-[#333333] text-base font-semibold leading-5 rounded-2xl p-6 w-full"
      />
    </div>
  );
}
