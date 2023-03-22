import { IExpense } from "@/models";
import { withPoints } from "@/utils/withPoints";

import styles from "./styles.module.scss";

export const ExpenseItem = ({ expense }: { expense: IExpense }) => {
  return (
    <>
      <div className={styles.expenseContainer}>
        <div className={styles.expense} key={expense?._id}>
          <div className={styles.item}>{expense?.hour}</div>
          <div className={styles.item}>{withPoints(expense?.amount)}</div>
          <div className={styles.item}>
            <span
              className={styles.type}
              style={{
                // @ts-ignore
                background: `#${expense?.type?.color}25`,
                // @ts-ignore
                color: `#${expense?.type?.color}`,
              }}
            >
              {/* @ts-ignore */}
              {expense?.type?.name}
            </span>
          </div>
          <div className={styles.item}>-</div>
          <div className={styles.item}>{expense?.description}</div>
        </div>
        <Options />
      </div>
    </>
  );
};

const Options = () => {
  return (
    <div className={styles.options}>
      <ThreePoints />
    </div>
  );
};

const ThreePoints = () => (
  <svg
    width="3"
    height="13"
    viewBox="0 0 3 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.28571 7.81707C2 7.81707 2.57143 7.23171 2.57143 6.5C2.57143 5.76829 2 5.18293 1.28571 5.18293C0.571428 5.18293 0 5.76829 0 6.5C0 7.23171 0.571428 7.81707 1.28571 7.81707ZM0 11.1829C0 10.4512 0.571428 9.86585 1.28571 9.86585C2 9.86585 2.57143 10.4512 2.57143 11.1829C2.57143 11.9146 2 12.5 1.28571 12.5C0.571428 12.5 0 11.9146 0 11.1829ZM0 1.81707C0 1.08537 0.571428 0.5 1.28571 0.5C2 0.5 2.57143 1.08537 2.57143 1.81707C2.57143 2.54878 2 3.13415 1.28571 3.13415C0.571428 3.13415 0 2.54878 0 1.81707Z"
      fill="white"
    />
  </svg>
);
