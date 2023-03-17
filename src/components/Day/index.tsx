import useExpenseTypeById from "@/hooks/useExpenseTypeById";
import { nameOfsDays } from "@/utils/monthsAndDays";
import { IExpense, IExpenseType } from "@/models";
import { useWeekPicker } from "@/hooks";
import Link from "next/link";

import styles from "./styles.module.scss";

export const Day = ({ day, expenses, dayName }: any) => {
  const { today } = useWeekPicker();
  let ids = expenses && expenses.map((expense: IExpense) => expense.type);
  const { data } = useExpenseTypeById(ids);
  let onlyDay = day?.split("-")[0];
  //@ts-ignore
  let todayNumber = today?.split("/")[0];

  return (
    <Link
      className={
        onlyDay === todayNumber ? styles.todayContainer : styles.dayContainer
      }
      href={`/day/${day}?nameDay=${nameOfsDays[dayName]}`}
      key={day}
    >
      <div className={styles.dayNumber}>{onlyDay}</div>
      <div className={styles.expenses}>
        {data?.length > 0 &&
          data?.map((type: IExpenseType) => (
            <span style={{ background: `#${type?.color}50` }} key={type._id}>
              {type?.name}
            </span>
          ))}
      </div>
    </Link>
  );
};
