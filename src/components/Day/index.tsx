import { useWeekPicker } from "@/hooks";
import useExpenseTypeById from "@/hooks/useExpenseTypeById";
import { IExpense } from "@/models";
import styles from "./styles.module.scss";

export const Day = ({ day, expenses }: any) => {
  const { today } = useWeekPicker();
  let ids = expenses && expenses.map((expense: IExpense) => expense.type);
  const { data } = useExpenseTypeById(ids);
  let onlyDay = day?.split("-")[0];
  //@ts-ignore
  let todayNumber = today?.split("/")[0];

  return (
    <div
      // prettier-ignore
      className={onlyDay === todayNumber ? styles.todayContainer : styles.dayContainer}
      key={day}
    >
      <div className={styles.dayNumber}>{onlyDay}</div>
      <div className={styles.expenses}>
        {data?.length > 0 &&
          data?.map((type: any) => (
            <span style={{ background: `#${type?.color}50` }} key={type}>
              {type?.name}
            </span>
          ))}
      </div>
    </div>
  );
};
