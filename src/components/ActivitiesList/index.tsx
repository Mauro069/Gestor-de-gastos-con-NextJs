import { ActivityItem } from "../ActivityItem";
import { IActivity } from "@/models/Activity";
import { useRouter } from "next/router";
import Image from "next/image";

import styles from "./styles.module.scss";

interface ActivitiesListProps {
  activities: IActivity[] | null;
  expand?: boolean;
  title: string;
}

export const ActivitiesList = ({
  activities,
  expand,
  title,
}: ActivitiesListProps) => {
  const router = useRouter();

  return (
    <table className={styles.activitiesList}>
      <thead>
        <tr className={styles.top}>
          <th>{title}</th>
          {expand && (
            <th className={styles.expand}>
              <Image
                onClick={() => router.push("/activities")}
                src="/assets/Expand.svg"
                alt="expand"
                width={20}
                height={20}
              />
            </th>
          )}
        </tr>
      </thead>
      <thead>
        <tr className={styles.subtitles}>
          <th>Fecha</th>
          <th>Descripción</th>
          <th>Tipo de movimiento</th>
          <th>Cantidad</th>
          <th>Tipo</th>
        </tr>
      </thead>
      <tbody className={styles.activities}>
        {activities!?.length > 0 &&
          activities?.map((activity) => (
            <ActivityItem key={activity?._id!.toString()} activity={activity} />
          ))}
      </tbody>
    </table>
  );
};
