import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setForecast } from "../WeatherPanel/WeatherPanelSlice";
import calendarStyles from "./AppCalendar.module.css";
import { months, weekDays } from "./common/calendar-data";

export const AppCalendar = () => {
  const dispatch = useAppDispatch();

  const daysInMonth = (year: number, month: number) => {
    if (month < 0) {
      month = 11;
      year--;
    }
    if (month > 11) {
      month = 0;
      year++;
    }
    return 32 - new Date(year, month, 32).getDate();
  };

  const getWeekStart = (year: number, month: number) => {
    return new Date(year, month).getDay();
  };

  const date = new Date();
  const today = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const weekStartAtIndex = getWeekStart(year, monthIndex);
  const [selectedMonth, setSelectedMonth] = useState(monthIndex);
  const [selectedYear, setSelectedYear] = useState(year);
  const [weekStartAt, setWeekStartAt] = useState(weekStartAtIndex);

  useEffect(() => {
    if (selectedMonth > 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else if (selectedMonth < 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    }
    setWeekStartAt(getWeekStart(selectedYear, selectedMonth));
  }, [selectedMonth, selectedYear, year]);

  const isToday = (index: number) => {
    const isTodaysMonth = selectedMonth === monthIndex;
    const isTodaysYear = selectedYear === year;
    if (!isTodaysMonth || !isTodaysYear) return "";
    return today === index - 1 ? calendarStyles.today : "";
  };

  const isForecast = (index: number) => {
    const isTodaysMonth = selectedMonth === monthIndex;
    const isTodaysYear = selectedYear === year;
    if (!isTodaysMonth || !isTodaysYear) return "";
    return today < index - 1 && today + 8 > index - 1
      ? calendarStyles.forecast
      : "";
  };

  return (
    <div className="w-96 h-96 mb-4 text-center border-2 rounded-md">
      <div className="flex justify-between items-center">
        <button
          className="p-2 m-2 rounded-full active:bg-gray-200"
          onClick={() => setSelectedMonth(selectedMonth - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="capitalize text-xl font-medium">
          {months[selectedMonth]} {selectedYear}
        </div>
        <button
          className="p-2 m-2 rounded-full active:bg-gray-200"
          onClick={() => setSelectedMonth(selectedMonth + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-5 px-5">
        {weekDays.map((weekDay, index) => (
          <div key={weekDay + index} className="text-lg font-medium">
            {weekDay}
          </div>
        ))}
        {[...Array(42)].map((day, index) => {
          return (
            <div key={"day" + index}>
              {index < weekStartAt && (
                <span className="text-gray-400">
                  {daysInMonth(selectedYear, selectedMonth - 1) +
                    (index - weekStartAt + 1)}
                </span>
              )}

              {index >= weekStartAt &&
              index <=
                daysInMonth(selectedYear, selectedMonth) + weekStartAt - 1 ? (
                <span
                  className={`${isToday(index)} ${isForecast(index)}`}
                  onClick={() => dispatch(setForecast(index - today - 1))}
                >
                  {index - weekStartAt + 1}
                </span>
              ) : (
                ""
              )}

              {index >
                daysInMonth(selectedYear, selectedMonth) + weekStartAt - 1 && (
                <span className="text-gray-400">
                  {index -
                    weekStartAt +
                    1 -
                    daysInMonth(selectedYear, selectedMonth)}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
