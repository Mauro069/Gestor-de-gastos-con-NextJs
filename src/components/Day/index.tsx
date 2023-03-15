import { useExpenses } from "@/hooks";
import useWeekPicker from "@/hooks/useWeekPicker";
import styles from "./styles.module.scss";

export const Day = ({ day }: any) => {
  const { today } = useWeekPicker();
  let onlyDay = day?.split("/")[0];
  let dayForFetch = day?.split("/").join("-");
  const { expenses } = useExpenses(dayForFetch);

  return (
    <div
      className={day === today ? styles.todayContainer : styles.dayContainer}
      key={day}
    >
      <div className={styles.dayNumber}>{onlyDay}</div>
      <div className={styles.expenses}>
        {expenses!?.length > 0 &&
          expenses?.map((expense: any) => {
            console.log(expense)

            return <span key={expense}>{expense?.type?.name}</span>;
          })}
      </div>
    </div>
  );
};
