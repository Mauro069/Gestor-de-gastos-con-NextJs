import { useQuery, useMutation } from "react-query";
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
  const { data, isLoading, error, refetch } = useQuery<
    { reports: Report[] },
    AxiosError<ApiError>
  >(["reports", user], async () => {
    const response = await axios.get(`/api/reports/user/${user!._id}`);
    return response.data;
  });

  const { mutate: createReport } = useMutation<
    Report,
    AxiosError<ApiError>,
    Report
  >(
    async (newReport: Report) => {
      const response = await axios.post("/api/reports", newReport);
      return response.data;
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const { mutate: deleteReport } = useMutation<
    any,
    AxiosError<ApiError>,
    string
  >(
    async (reportId: string) => {
      const response = await axios.delete(`/api/reports/${reportId}`);
      return response.data;
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  return {
    reports: data?.reports ?? [],
    isLoading,
    error,
    createReport,
    deleteReport,
  };
};
