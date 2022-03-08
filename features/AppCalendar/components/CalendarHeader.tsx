import { months } from "../common/calendar-data";

export const CalendarHeader: React.FC<{
  selectedMonth: number;
  selectedYear: number;
  handleSetSelectedMonth: (selectedMonth: number) => void;
}> = ({ selectedMonth, selectedYear, handleSetSelectedMonth }) => {
  return (
    <div className="flex justify-between items-center">
      <button
        className="p-2 m-2 rounded-full active:bg-gray-200"
        onClick={() => handleSetSelectedMonth(selectedMonth - 1)}
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
        onClick={() => handleSetSelectedMonth(selectedMonth + 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};
