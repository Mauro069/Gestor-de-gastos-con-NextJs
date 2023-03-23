import { useEffect, useRef, useState } from "react";
import { ExpenseItem, Titles } from "./components";
import { IExpense } from "@/models";

import styles from "./styles.module.scss";
import { Loader } from "../Loader";

export const Expenses = ({
  expenses,
  isLoading,
  deleteExpense,
  isLoadingDeleteExpense,
  isLoadingEditExpense,
  editExpense,
}: {
  expenses: IExpense[];
  isLoading: boolean;
  deleteExpense: any;
  isLoadingDeleteExpense: boolean;
  isLoadingEditExpense: boolean;
  editExpense: any;
}) => {
  const titles = [
    "Hora",
    "Importe",
    "Tipo de gasto",
    "Metodo de pago",
    "Descripción",
  ];

  const containerRef = useRef(null);
  const [showScrollBtn, setShowScrollBtn] = useState(true);

  useEffect(() => {
    const container = containerRef.current;

    function handleScroll() {
      /* @ts-ignore */
      const containerHeight = container?.offsetHeight;
      /* @ts-ignore */
      const containerScrollHeight = container?.scrollHeight;
      /* @ts-ignore */
      const containerScrollTop = container?.scrollTop;

      if (containerHeight + containerScrollTop === containerScrollHeight) {
        setShowScrollBtn(false);
      } else {
        setShowScrollBtn(true);
      }
    }
    /* @ts-ignore */
    container?.addEventListener("scroll", handleScroll);
    /* @ts-ignore */
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  function handleScrollToTop() {
    /* @ts-ignore */
    containerRef.current.scrollTo({
      /* @ts-ignore */
      top: containerRef.current.scrollHeight,
      behavior: "smooth", // Utiliza scroll suave
    });
  }

  return (
    <div className={styles.expensesContainer}>
      <span className={styles.subtitle}>Movimientos del dia</span>
      <Titles titles={titles} />
      <div className={styles.expensesList} ref={containerRef}>
        {expenses?.length > 0 &&
          expenses?.map((expense: IExpense) => (
            <ExpenseItem
              isLoadingEditExpense={isLoadingEditExpense}
              editExpense={editExpense}
              isLoadingDeleteExpense={isLoadingDeleteExpense}
              deleteExpense={deleteExpense}
              key={expense._id}
              expense={expense}
            />
          ))}
        {isLoading && (
          <div className={styles.notFound}>
            <Loader />
          </div>
        )}
        {!isLoading && expenses?.length === 0 && (
          <div className={styles.notFound}>
            Aún no has cargado ningun gasto...
          </div>
        )}
        {expenses?.length > 6 && (
          <button
            className={styles.scrollBtn}
            style={{ display: showScrollBtn ? "block" : "none" }}
            onClick={handleScrollToTop}
          >
            Ver mas
          </button>
        )}
      </div>
    </div>
  );
};
