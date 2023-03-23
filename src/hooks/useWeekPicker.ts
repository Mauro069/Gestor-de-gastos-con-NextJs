import { useCallback, useEffect, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/router";

interface WeekPicker {
  week: Dayjs | null;
  handlePrevWeekClick: () => void;
  handleNextWeekClick: () => void;
  days: string[];
  today: string | Dayjs;
  prevWeekStart: string | undefined;
  prevWeekEnd: string | undefined;
}

export const useWeekPicker = (): WeekPicker => {
  const router = useRouter();

  const [week, setWeek] = useState<Dayjs | null>(null);

  const handlePrevWeekClick = useCallback(() => {
    const prevWeek = week!.subtract(1, "week");
    const queryParams = { week: prevWeek.format("YYYY-MM-DD") };
    router.push({ query: queryParams });
    setWeek(prevWeek);
  }, [week, router]);

  const handleNextWeekClick = useCallback(() => {
    const nextWeek = week!.add(1, "week");
    const queryParams = { week: nextWeek.format("YYYY-MM-DD") };
    router.push({ query: queryParams });
    setWeek(nextWeek);
  }, [week, router]);

  const startOfWeek = useMemo(
    () => week?.startOf("week").add(1, "day"),
    [week]
  );
  const endOfWeek = useMemo(() => week?.endOf("week").add(1, "day"), [week]);
  const today = useMemo(() => dayjs().format("DD-MM-YYYY"), []);
  const days: string[] = [];

  const prevWeekStart = useMemo(
    () =>
      week
        ?.subtract(1, "week")
        .startOf("week")
        .add(1, "day")
        .format("DD-MM-YYYY"),
    [week]
  );

  const prevWeekEnd = useMemo(
    () =>
      week
        ?.subtract(1, "week")
        .endOf("week")
        .add(1, "day")
        .format("DD-MM-YYYY"),
    [week]
  );

  for (
    let day = startOfWeek;
    day?.isBefore(endOfWeek);
    day = day.add(1, "day")
  ) {
    days.push(day.format("DD-MM-YYYY"));
  }

  useEffect(() => {
    router?.query?.week
      ? // @ts-ignore
        setWeek(dayjs(router?.query?.week))
      : setWeek(dayjs());
  }, [router]);

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
