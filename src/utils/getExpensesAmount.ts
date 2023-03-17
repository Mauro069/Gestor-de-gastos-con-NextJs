import { IExpense } from "@/models";

export const getAmount = (expenses: IExpense[]) =>
  expenses.reduce((acc, cur) => acc + cur.amount, 0);
