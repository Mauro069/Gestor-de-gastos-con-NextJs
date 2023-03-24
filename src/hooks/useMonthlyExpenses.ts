import axios from "axios";
import { useQuery } from "react-query";

type WeekExpensesQueryParams = {
  month: any;
};

interface ExpenseData {
  totalAmount: number;
  maxExpenseType: string;
  maxExpenseAmount: number;
  percentage: number
}

const useMonthlyExpenses = (month: WeekExpensesQueryParams) => {
  return useQuery(["monthlyExpenses", month], async () => {
    if (month) {
      const { data }: { data: ExpenseData } = await axios.get(
        `/api/expenses/monthly?month=${month}`
      );

      return data;
    }
  });
};

export default useMonthlyExpenses;
