import { validatePercentage } from "@/utils/validatePercentage";
import { transformDateToISO } from "@/utils/transformDateToISO";
import { CreateExpense } from "@/components/Forms";
import { withPoints } from "@/utils/withPoints";
import { useRouter } from "next/router";
import { useExpenses } from "@/hooks";
import Link from "next/link";

import styles from "../../styles/dayDetailPage.module.scss";

const DayDetailPage = (): JSX.Element => {
  const { query } = useRouter();
  const { expenses, todayExpensesAmount, percentage, createExpense } =
    useExpenses(transformDateToISO(query?.day, "start"));

  return (
    <div className={styles.pageContainer}>
      <div className={styles.topContainer}>
        <div className={styles.welcomeContainer}>
          <small>
            {query?.day} <Link href="/home">Regresar</Link>
          </small>

          <span className={styles.welcome}>{query?.nameDay}</span>
          <div className={styles.expensesAmountContainer}>
            <span className={styles.subtitle}>
              Hoy gastaste {validatePercentage(percentage!, "mas", "menos")} que
              ayer
            </span>
            <div className={styles.expensesAmount}>
              <h1>${withPoints(todayExpensesAmount!)}</h1>{" "}
              {percentage && (
                <div
                  style={{
                    background: validatePercentage(
                      percentage,
                      "#FF0000",
                      "#01BB1F",
                      "#FCC70A"
                    ),
                  }}
                  className={styles.percentage}
                >
                  {withPoints(percentage)}%
                </div>
              )}
            </div>
          </div>
        </div>
        <CreateExpense createExpense={createExpense}/>
      </div>
      <pre>{JSON.stringify({ expenses, todayExpensesAmount }, null, 2)}</pre>
    </div>
  );
};

export default DayDetailPage;
