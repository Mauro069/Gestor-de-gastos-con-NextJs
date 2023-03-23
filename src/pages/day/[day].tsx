import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { validatePercentage } from "@/utils/validatePercentage";
import { transformDateToISO } from "@/utils/transformDateToISO";
import { ExpenseForm } from "@/components/Forms";
import { withPoints } from "@/utils/withPoints";
import { Doughnut } from "react-chartjs-2";
import { Expenses } from "@/components";
import { useRouter } from "next/router";
import { useExpenses } from "@/hooks";
import Link from "next/link";

import styles from "../../styles/dayDetailPage.module.scss";
import { useContext, useEffect, useState } from "react";
import NotificationContext from "@/context/notificationContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const DayDetailPage = (): JSX.Element => {
  const { query, back } = useRouter();
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
    updateExpense,
    isLoadingUpdateExpense,
    updateData
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
    updateExpense: any;
    isLoadingUpdateExpense: any;
    updateData: any
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

  useEffect(() => {
    if (updateData?.msj) {
      showNotification!({
        open: true,
        msj: updateData.msj,
        status: updateData.updatedExpense ? "success" : "error",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateData]);

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

  const onCreateExpense = (values: any, { type, setType }: any) => {
    if (values.amount && type) {
      const { amount, description, time } = values;

      createExpense({
        date: query?.day,
        hour: time,
        description,
        amount,
        type,
      });

      setType(null);

      // @ts-ignore
      showNotification({
        msj: "Gasto agregado correctamente",
        open: true,
        status: "success",
      });
    } else {
      // @ts-ignore
      showNotification({
        msj: "Te falto enviar algun campo obligatorio!",
        open: true,
        status: "error",
      });
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.topContainer}>
        <div className={styles.welcomeContainer}>
          <small>
            {query?.day} <a onClick={back}>Regresar</a>
          </small>

          <span className={styles.welcome}>{query?.nameDay}</span>
          <div className={styles.expensesAmountContainer}>
            <span className={styles.subtitle}>
              {validatePercentage(
                percentage!,
                "Hoy gastaste más que ayer",
                "Hoy gastaste menos que ayer"
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
          <ExpenseForm
            textSubmitButton="Agregar Gasto"
            onSubmit={onCreateExpense}
            isLoading={isLoadingCreateExpense}
          />
        </div>
      </div>

      <Expenses
        isLoadingEditExpense={isLoadingUpdateExpense}
        editExpense={updateExpense}
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
