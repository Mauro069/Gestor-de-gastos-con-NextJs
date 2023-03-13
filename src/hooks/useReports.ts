import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { useAuth } from "./useAuth";

type Report = {
  _id: string;
  userRef: string;
  month: string;
  initialMoney: number;
  currentAmount: number;
  createdAt: Date;
  updatedAt: Date;
};

type ApiError = {
  message: string;
  statusCode: number;
};

export const useReports = () => {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery<
    { reports: Report[] },
    AxiosError<ApiError>
  >(["reports", user], async () => {
    const response = await axios.get(`/api/reports/${user!._id}`);
    return response.data;
  });

  return {
    reports: data?.reports ?? [],
    isLoading,
    error,
  };
};
