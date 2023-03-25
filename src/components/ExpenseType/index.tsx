import { IExpense, IExpenseType } from "@/models";

import styles from "./styles.module.scss";

export const ExpenseType = ({
  expense,
  type,
}: {
  expense?: IExpense;
  type?: IExpenseType;
}) => {
  return expense || type ? (
    <span
      className={styles.type}
      style={{
        // @ts-ignore
        background: `#${expense?.type?.color || type?.color}25`,
        // @ts-ignore
        color: `#${expense?.type?.color || type?.color}`,
      }}
    >
      {/* @ts-ignore */}
      {expense?.type?.name || type?.name}
    </span>
  ) : null;
};
