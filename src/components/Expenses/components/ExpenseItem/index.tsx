import useExpenseTypesQuery from "@/hooks/useExpenseTypeById";
import { IExpense, IExpenseType } from "@/models";
import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";

export const ExpenseItem = ({ expense }: { expense: IExpense }) => {
  const { data } = useExpenseTypesQuery([expense?.type]);

  const type = data?.length > 0 && data[0];

  return (
    <div className={styles.expense} key={expense._id}>
      <div className={styles.item}>{expense.hour}</div>
      <div className={styles.item}>{expense.amount}</div>
      <div className={styles.item}>
        <span
          className={styles.type}
          style={{ background: `#${type?.color}50` }}
        >
          {type?.name}
        </span>
      </div>
      <div className={styles.item}>-</div>
      <div className={styles.item}>{expense.description}</div>
    </div>
  );
};
