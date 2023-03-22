import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { validatePercentage } from "@/utils/validatePercentage";
import { transformDateToISO } from "@/utils/transformDateToISO";
import { CreateExpense } from "@/components/Forms";
import { withPoints } from "@/utils/withPoints";
import { Doughnut } from "react-chartjs-2";
import { Expenses } from "@/components";
import { useRouter } from "next/router";
import { useExpenses } from "@/hooks";
import Link from "next/link";

import styles from "../../styles/dayDetailPage.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

const DayDetailPage = (): JSX.Element => {
  const { query } = useRouter();
  const {
    expenses,
    todayExpensesAmount,
    percentage,
    createExpense,
    isLoading,
    graphicData,
    deleteExpense,
  } = useExpenses(transformDateToISO(query?.day, "start"));

  interface GraphicDataItem {
    name: string;
    color: string;
    percentage: number;
    totalAmount: number;
  }

  const data = {
    labels: graphicData?.map(
      (expenseType: GraphicDataItem) => expenseType.name
    ),
    datasets: [
      {
        label: "Dinero gastado",
        data: graphicData?.map(
          (expenseType: GraphicDataItem) => expenseType.totalAmount
        ),
        backgroundColor: graphicData?.map(
          (expenseType: GraphicDataItem) => `${expenseType.color}50`
        ),
        borderColor: graphicData?.map(
          (expenseType: GraphicDataItem) => expenseType.color
        ),
        borderWidth: 1,
      },
    ],
    redraw: true,
  };

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
              {validatePercentage(
                percentage!,
                "Hoy gastaste más que la semana anterior",
                "Hoy gastaste menos que la semana anterior"
              )}
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
        <div className={styles.flex}>
          <Doughnut data={data} />
          <CreateExpense createExpense={createExpense} />
        </div>
      </div>

      <Expenses
        deleteExpense={deleteExpense}
        // @ts-ignore
        expenses={expenses}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DayDetailPage;
