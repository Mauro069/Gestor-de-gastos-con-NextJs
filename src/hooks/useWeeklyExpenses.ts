import { useQuery } from "react-query";
import axios from "axios";

export const useWeeklyExpenses = (days: any) => {
  const fetchWeeklyExpenses = async () => {
    const { data } = await axios.post(`/api/expenses/weekly`, {
      daysBody: days,
    });
    return data;
  };

  return useQuery(["weeklyExpenses", days], fetchWeeklyExpenses);
};
