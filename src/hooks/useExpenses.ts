import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { ObjectId } from "mongoose";
import { IExpenseType, IReport } from "@/models";

type Expense = {
  _id?: string;
  date: string;
  amount: number;
  description: string;
  type: ObjectId | IExpenseType;
  reportRef: ObjectId | IReport;
  createdAt?: string;
  updatedAt?: string;
};

type ApiError = {
  message: string;
  statusCode: number;
};

export const useExpenses = (day: any) => {
  const { data, isLoading, error, refetch } = useQuery<
    { expenses: Expense[]; todayExpensesAmount: number; percentage: number },
    AxiosError<ApiError>
  >(["expenses", day], async () => {
    const { data } = await axios.get(`/api/expenses/${day}`);
    return data;
  });

  return {
    todayExpensesAmount: data?.todayExpensesAmount,
    expenses: data?.expenses,
    percentage: data?.percentage,
    isLoading,
    error,
    refetch,
  };
};
