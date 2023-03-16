import { useAuth, useWeeklyExpenses, useWeekPicker } from "@/hooks";
import { useRouter } from "next/router";

import styles from "../../styles/dayDetailPage.module.scss";

const DayDetailPage = (): JSX.Element => {
  const { query } = useRouter();
  const { user } = useAuth();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.welcomeContainer}>
        <small>{query?.day}</small>
        <span className={styles.welcome}>{query?.nameDay}</span>
        <div className={styles.expensesAmountContainer}>
          <span className={styles.subtitle}>Hoy gastaste</span>
        </div>
      </div>
      <pre>{JSON.stringify(query, null, 2)}</pre>
    </div>
  );
};

export default DayDetailPage;
