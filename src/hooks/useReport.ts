import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";

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

export const useReport = (reportId: string | string[] | undefined) => {
  const {
    data: report,
    isLoading,
    error,
    refetch,
  } = useQuery<Report, AxiosError<ApiError>, Report>(
    ["report", reportId],
    async () => {
      const response = await axios.get(`/api/reports/${reportId}`);
      return response.data;
    }
  );

  return {
    report,
    isLoading,
    error,
    refetch,
  };
};
