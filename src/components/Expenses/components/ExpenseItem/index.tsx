import { ExpenseType } from "@/components/ExpenseType";
import { withPoints } from "@/utils/withPoints";
import { IExpense } from "@/models";
import { Options } from "../Options";

import styles from "./styles.module.scss";

export const ExpenseItem = ({
  expense,
  deleteExpense,
  isLoadingDeleteExpense,
}: {
  expense: IExpense;
  deleteExpense: any;
  isLoadingDeleteExpense: boolean;
}) => {
  const onDelete = async () => {
    await deleteExpense(expense._id);
  };

  return (
    <>
      <div className={styles.expenseContainer}>
        <div className={styles.expense} key={expense?._id}>
          <div className={styles.item}>{expense?.hour}</div>
          <div className={styles.item}>{withPoints(expense?.amount)}</div>
          <div className={styles.item}>
            <ExpenseType expense={expense} />
          </div>
          <div className={styles.item}>-</div>
          <div className={styles.item}>{expense?.description}</div>
        </div>
        <Options
          isLoadingDeleteExpense={isLoadingDeleteExpense}
          deleteExpense={onDelete}
        />
      </div>
    </>
  );
};
