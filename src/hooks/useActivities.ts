import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { IActivity } from "@/models/Activity";

interface useActivitiesProps {
  lastFive?: boolean;
}

export const useActivities = ({ lastFive }: useActivitiesProps) => {
  const URL = lastFive ? "/api/activities?last=true" : "/api/activities";

  const fetchActivities = async () => {
    const { data }: { data: { activities: IActivity[] } } = await axios.get(
      URL
    );
    return data.activities;
  };

  const { data: activities, refetch } = useQuery(
    ["activities"],
    fetchActivities
  );

  const { mutate: createActivity } = useMutation(
    async (newActivity: IActivity) => {
      const response = await axios.post("/api/activities", newActivity);
      return response.data;
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  return {
    activities,
    createActivity,
  };
};
