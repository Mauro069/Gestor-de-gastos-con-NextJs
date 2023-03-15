import { useMutation, useQuery } from "react-query";
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

export const useExpenses = (reportId: string | string[] | undefined) => {
  const {
    data: expenses,
    isLoading,
    error,
    refetch,
  } = useQuery<Expense[], AxiosError<ApiError>>(
    ["expensesByReportId", reportId],
    async () => {
      const response = await axios.get(`/api/expenses/${reportId}/`);
      return response.data;
    }
  );

  const { mutate: createExpense } = useMutation<
    Expense,
    AxiosError<ApiError>,
    Expense
  >(
    async (newExpense: Expense) => {
      const response = await axios.post(
        `/api/expenses`,
        newExpense
      );
      return response.data;
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  return {
    expenses,
    isLoading,
    createExpense,
    error,
    refetch,
  };
};
