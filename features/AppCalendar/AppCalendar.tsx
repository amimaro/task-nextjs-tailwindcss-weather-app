import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AppLoader } from "../components/AppLoader";
import {
  selectCurrentDate,
  setForecast,
} from "../WeatherPanel/WeatherPanelSlice";
import calendarStyles from "./AppCalendar.module.css";
import { CalendarWeek, CalendarHeader } from "./components";

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

const getDateInfo = (date: number) => {
  const dateObj = new Date(date);
  return {
    today: dateObj.getDate(),
    monthIndex: dateObj.getMonth(),
    year: dateObj.getFullYear(),
    weekStartAtIndex: getWeekStart(dateObj.getFullYear(), dateObj.getMonth()),
  };
};

export const AppCalendar = () => {
  const dispatch = useAppDispatch();
  const currentDate = useAppSelector(selectCurrentDate);

  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(2022);
  const [weekStartAt, setWeekStartAt] = useState(0);

  useEffect(() => {
    const { monthIndex, year, weekStartAtIndex } = getDateInfo(currentDate);
    setSelectedMonth(monthIndex);
    setSelectedYear(year);
    setWeekStartAt(weekStartAtIndex);
  }, [currentDate]);

  useEffect(() => {
    if (selectedMonth > 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else if (selectedMonth < 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    }
    setWeekStartAt(getWeekStart(selectedYear, selectedMonth));
  }, [selectedMonth, selectedYear]);

  if (isNaN(currentDate)) {
    return <AppLoader />;
  }

  const isToday = (index: number) => {
    const { today, monthIndex, year } = getDateInfo(currentDate);
    const isTodaysMonth = selectedMonth === monthIndex;
    const isTodaysYear = selectedYear === year;
    if (!isTodaysMonth || !isTodaysYear) return "";
    return today === index - 1 ? calendarStyles.today : "";
  };

  const isForecast = (index: number) => {
    const { today, monthIndex, year } = getDateInfo(currentDate);
    const isTodaysMonth = selectedMonth === monthIndex;
    const isTodaysYear = selectedYear === year;
    if (!isTodaysMonth || !isTodaysYear) return "";
    return today < index - 1 && today + 8 > index - 1
      ? calendarStyles.forecast
      : "";
  };

  return (
    <div className="w-96 h-96 mb-4 text-center border-2 rounded-md">
      <CalendarHeader
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        handleSetSelectedMonth={setSelectedMonth}
      />
      <div className="grid grid-cols-7 gap-3 px-5">
        <CalendarWeek />
        {[...Array(42)].map((day, index) => {
          return (
            <div
              key={"day" + index}
              className={`${isToday(index)} ${isForecast(index)}`}
              onClick={() => dispatch(setForecast(index - weekStartAt + 1))}
            >
              {index < weekStartAt && (
                <span className="text-gray-400">
                  {daysInMonth(selectedYear, selectedMonth - 1) +
                    (index - weekStartAt + 1)}
                </span>
              )}

              {index >= weekStartAt &&
              index <=
                daysInMonth(selectedYear, selectedMonth) + weekStartAt - 1 ? (
                <span>{index - weekStartAt + 1}</span>
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
