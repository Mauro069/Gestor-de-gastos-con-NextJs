import dayjs from "dayjs";
import { transformDateToISO } from "./transformDateToISO";

export const getPreviousDay = (day: string) => {
  const dayFormatted = day?.split("T")[0];
  const todayDate = dayjs(dayFormatted);
  const previousDate = todayDate.subtract(1, "day").format("DD-MM-YYYY");
  return transformDateToISO(previousDate, "start");
};
