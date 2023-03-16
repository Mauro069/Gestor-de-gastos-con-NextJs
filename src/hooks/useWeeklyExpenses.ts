import { useQuery } from "react-query";
import axios from "axios";

export const useWeeklyExpenses = (
  days: any,
  prevWeekEnd: any,
  prevWeekStart: any
) => {
  const fetchWeeklyExpenses = async () => {
    const { data } = await axios.post(`/api/expenses/weekly`, {
      daysBody: days,
      prevWeekEnd,
      prevWeekStart,
    });
    return data;
  };

  return useQuery(["weeklyExpenses", days], fetchWeeklyExpenses);
};
