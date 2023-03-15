import { useCallback, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

interface WeekPicker {
  week: Dayjs;
  handlePrevWeekClick: () => void;
  handleNextWeekClick: () => void;
  days: string[];
  today: string | Dayjs;
  currentWeekStart: string;
  currentWeekEnd: string;
  previousWeekStart: string;
  previousWeekEnd: string;
}

const useWeekPicker = (): WeekPicker => {
  const [week, setWeek] = useState<Dayjs>(
    dayjs().startOf("week").add(1, "day")
  );

  const handlePrevWeekClick = useCallback(() => {
    setWeek((prevWeek) => prevWeek.subtract(1, "week"));
  }, []);

  const handleNextWeekClick = useCallback(() => {
    setWeek((prevWeek) => prevWeek.add(1, "week"));
  }, []);

  const startOfWeek = useMemo(() => week.startOf("week").add(1, "day"), [week]);
  const endOfWeek = useMemo(() => week.endOf("week").add(1, "day"), [week]);
  const today = useMemo(() => dayjs().format("DD/MM/YYYY"), []);
  const days: string[] = [];

  for (
    let day = startOfWeek;
    day.isBefore(endOfWeek);
    day = day.add(1, "day")
  ) {
    days.push(day.format("DD/MM/YYYY"));
  }

  const currentWeekStart = startOfWeek.format("YYYY-MM-DD");
  const currentWeekEnd = endOfWeek.format("YYYY-MM-DD");
  const previousWeekStart = startOfWeek.subtract(1, "week").format("YYYY-MM-DD");
  const previousWeekEnd = endOfWeek.subtract(1, "week").format("YYYY-MM-DD");

  return {
    week,
    handlePrevWeekClick,
    handleNextWeekClick,
    days,
    today,
    currentWeekStart,
    currentWeekEnd,
    previousWeekStart,
    previousWeekEnd
  };
};

export default useWeekPicker;
