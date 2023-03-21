import { IExpense } from "@/models";
import { withPoints } from "@/utils/withPoints";

import styles from "./styles.module.scss";

export const ExpenseItem = ({ expense }: { expense: IExpense }) => {
  return (
    <div className={styles.expense} key={expense._id}>
      <div className={styles.item}>{expense.hour}</div>
      <div className={styles.item}>{withPoints(expense.amount)}</div>
      <div className={styles.item}>
        <span
          className={styles.type}
          // @ts-ignore
          style={{ background: `#${expense?.type?.color}50` }}
        >
          {/* @ts-ignore */}
          {expense?.type?.name}
        </span>
      </div>
      <div className={styles.item}>-</div>
      <div className={styles.item}>{expense.description}</div>
    </div>
  );
};
