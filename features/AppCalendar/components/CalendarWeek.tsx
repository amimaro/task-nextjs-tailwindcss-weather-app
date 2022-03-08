import { weekDays } from "../common/calendar-data";

export const CalendarWeek: React.FC = () => {
  return (
    <>
      {weekDays.map((weekDay, index) => (
        <div key={weekDay + index} className="text-lg font-medium">
          {weekDay}
        </div>
      ))}
    </>
  );
};
