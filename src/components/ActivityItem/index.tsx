import { ActivityType, IActivity } from "@/models/Activity";
import { withPoints } from "@/utils/withPoints";
import styles from "./styles.module.scss";

interface ActivityItemProps {
  activity: IActivity | null;
}

export const ActivityItem = ({ activity }: ActivityItemProps) => {
  if (activity) {
    return (
      <tr className={styles.activityItem}>
        <td>{activity.date.split("T")[0]}</td>
        <td>{activity.description || "-"}</td>
        <ActivityTypeItem type={activity.type} />
        <td>${withPoints(parseInt(activity?.amount))}</td>
        <td>Proximamente...</td>
      </tr>
    );
  } else return <h1>Not activity</h1>;
};

const ActivityTypeItem = ({ type }: { type: ActivityType }) => {
  const words = {
    expense: {
      word: "Gasto",
    },
    entry: {
      word: "Entrada",
    },
  };

  return (
    type && (
      <td>
        <div className={`${styles.item} ${styles[type]}`}>
          {words[type].word}
        </div>
      </td>
    )
  );
};
