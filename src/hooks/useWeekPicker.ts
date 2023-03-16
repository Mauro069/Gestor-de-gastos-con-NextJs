import { useCallback, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

interface WeekPicker {
  week: Dayjs;
  handlePrevWeekClick: () => void;
  handleNextWeekClick: () => void;
  days: string[];
  today: string | Dayjs;
  prevWeekStart: string;
  prevWeekEnd: string;
}

export const useWeekPicker = (): WeekPicker => {
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

  const prevWeekStart = useMemo(
    () =>
      week
        .subtract(1, "week")
        .startOf("week")
        .add(1, "day")
        .format("DD-MM-YYYY"),
    [week]
  );
  const prevWeekEnd = useMemo(
    () =>
      week.subtract(1, "week").endOf("week").add(1, "day").format("DD-MM-YYYY"),
    [week]
  );

  for (
    let day = startOfWeek;
    day.isBefore(endOfWeek);
    day = day.add(1, "day")
  ) {
    days.push(day.format("DD-MM-YYYY"));
  }

  return {
    week,
    handlePrevWeekClick,
    handleNextWeekClick,
    days,
    today,
    prevWeekStart,
    prevWeekEnd,
  };
};
