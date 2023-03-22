import { useMutation, useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { ObjectId } from "mongoose";
import { IExpense, IExpenseType } from "@/models";

type Expense = {
  _id?: string;
  date: string;
  amount: number;
  description: string;
  type: ObjectId | IExpenseType;
  createdAt?: string;
  updatedAt?: string;
};

type ApiError = {
  message: string;
  statusCode: number;
};

export const useExpenses = (day: any) => {
  const {
    data,
    isLoading: isLoadingExpenses,
    error,
    refetch,
  } = useQuery<
    {
      expenses: Expense[];
      todayExpensesAmount: number;
      percentage: number;
      graphicData: any;
    },
    AxiosError<ApiError>
  >(["expenses", day], async () => {
    const { data } = await axios.get(`/api/expenses/${day}`);
    return data;
  });

  const { mutate: createExpense, isLoading: isLoadingCreateExpense } =
    useMutation<IExpense, AxiosError<ApiError>, IExpense>(
      async (newExpense: IExpense) => {
        const response = await axios.post("/api/expenses", newExpense);
        return response.data;
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );

  const { mutate: deleteExpense, isLoading: isLoadingDeleteExpense } =
    useMutation<void, AxiosError<ApiError>, string>(
      async (expenseId: string) => {
        await axios.delete(`/api/expenses`, { data: { expenseId } });
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );

  return {
    todayExpensesAmount: data?.todayExpensesAmount,
    expenses: data?.expenses,
    percentage: data?.percentage,
    graphicData: data?.graphicData,
    createExpense,
    deleteExpense,
    isLoadingExpenses,
    isLoadingCreateExpense,
    isLoadingDeleteExpense,
    error,
    refetch,
  };
};
