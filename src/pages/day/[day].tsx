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
import { useContext, useEffect } from "react";
import NotificationContext from "@/context/notificationContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const DayDetailPage = (): JSX.Element => {
  const { query } = useRouter();
  const {
    expenses,
    todayExpensesAmount,
    percentage,
    createExpense,
    isLoadingExpenses,
    isLoadingCreateExpense,
    isLoadingDeleteExpense,
    graphicData,
    deleteExpense,
    deleteData,
  }: {
    expenses: any;
    todayExpensesAmount: any;
    percentage: any;
    createExpense: any;
    isLoadingExpenses: any;
    isLoadingCreateExpense: any;
    isLoadingDeleteExpense: any;
    graphicData: any;
    deleteExpense: any;
    deleteData: any;
  } = useExpenses(transformDateToISO(query?.day, "start"));

  interface GraphicDataItem {
    name: string;
    color: string;
    percentage: number;
    totalAmount: number;
  }

  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (deleteData?.msj) {
      showNotification!({
        open: true,
        msj: deleteData.msj,
        status: deleteData.expenseDeleted ? "success" : "error",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteData]);

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
          {graphicData?.length > 0 && <Doughnut data={data} />}
          <CreateExpense
            createExpense={createExpense}
            isLoading={isLoadingCreateExpense}
          />
        </div>
      </div>

      <Expenses
        isLoadingDeleteExpense={isLoadingDeleteExpense}
        deleteExpense={deleteExpense}
        // @ts-ignore
        expenses={expenses}
        isLoading={isLoadingExpenses}
      />
    </div>
  );
};

export default DayDetailPage;
